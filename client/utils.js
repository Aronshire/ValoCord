const fs = require('fs')
const axios = require('axios');
const https = require('https');

function getLockfile() {
    if (fs.existsSync(`${process.env.LOCALAPPDATA}\\Riot Games\\Riot Client\\Config\\lockfile`)) {
        var file = fs.readFileSync(`${process.env.LOCALAPPDATA}\\Riot Games\\Riot Client\\Config\\lockfile`, 'utf8');
        let data = {
            port: file.split(':')[2],
            password: file.split(':')[3],
        }
        return data;
    } else {
        return null;
    }
}

async function getTokens() {
    const lockfile = getLockfile();
    const tokens = await axios.get(`https://127.0.0.1:${lockfile.port}/entitlements/v1/token`, {
        headers: {
            'Authorization': `Basic ${Buffer.from(`riot:${lockfile.password}`, 'utf8').toString('base64')}`,
            "user-agent": "ShooterGame/21 Windows/10.0.19042.1.768.64bit",
            "X-Riot-ClientVersion": "release-02.03-shipping-8-521855",
            "Content-Type": "application/json",
            "rchat-blocking": "true"
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        })
    });

    if (!tokens.data) return null;

    return tokens.data;
}

async function getLocalData() {
    const lockfile = getLockfile();
    const tokens = await getTokens();

    const presences = await axios.get(`https://127.0.0.1:${lockfile.port}/chat/v4/presences`, {
        headers: {
            'Authorization': `Basic ${Buffer.from(`riot:${lockfile.password}`, 'utf8').toString('base64')}`,
            "user-agent": "ShooterGame/21 Windows/10.0.19042.1.768.64bit",
            "X-Riot-ClientVersion": "release-02.03-shipping-8-521855",
            "Content-Type": "application/json",
            "rchat-blocking": "true"
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        })
    })
    if (!presences.data) return null;

    var f = presences.data.presences.filter(item => item.puuid == tokens.subject)

    if (!f[0]) return null;

    return f[0];
}

let languages = ['tr_TR', 'en_US']

let files = {
    'tr_TR': require('../languages/tr_TR.json'),
    'en_US': require('../languages/en_US.json')
}

function translate(lang = "tr_TR", value) {

    if (!languages.includes(lang)) lang = 'tr_TR';

    const file = files[lang];

    if (!file) null;

    return file[value] || null;

}

module.exports = {
    getLockfile,
    getLocalData,
    getTokens,
    translate
}