const { ipcRenderer } = require('electron');
let language = "tr_TR"

function sendMessage(message, args = null) {
    ipcRenderer.send(message, args);
}

setInterval(() => {
    sendMessage('getStatus');
}, 500);

ipcRenderer.on('status', (event, message) => {

    language = message?.language

    if (message.valorant?.status) {
        $('#gameStatus').text(message.valorant.user.game_name + '#'+ message.valorant.user.game_tag);
    } else {
        $('#gameStatus').text(translate(language, "open_valorant"));
    }

    if (message.discord?.status) {
        $('#discordStatus').text(message.discord.user.username + '#' + message.discord.user.discriminator);
    } else {
        $('#discordStatus').text(translate(language, "open_discord"));
    }

    $('#statusTitle').text(translate(language, "status"))
    $('#active').text(translate(language, "active"))
    $('#deactive').text(translate(language, "disable"))
    $('#select-language').text(translate(language, "select_language"))

    if (message.valorant?.status && message.discord?.status) {
        $('#status').text(translate(language, "ready"));
        $('#status').addClass('text-[#3ba55c]');
        $('#status').removeClass('text-[#ed4245]');
    } else {
        $('#status').text(translate(language, "not_ready"));
        $('#status').addClass('text-[#ed4245]');
        $('#status').removeClass('text-[#3ba55c]');
        $('#status').addClass('ml-[2rem]');

        $('disableButton').disable()
    }
    $('select').on('change', function (e) {
        var valueSelected = this.value;
        sendMessage('changeLanguage', valueSelected);
    });
});


function login() {
    sendMessage('login');
}

let languages = ['tr_TR', 'en_US']

let files = {
    'tr_TR': require("../languages/tr_TR.json"),
    'en_US': require('../languages/en_US.json')
}

function translate(lang="tr_TR", value) {

    if (!languages.includes(lang)) lang = 'tr_TR';

    const file = files[lang];

    if (!file) return null;

    return file[value] || value;

}