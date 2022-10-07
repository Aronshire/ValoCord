const axios = require('axios');
const RPC = require('discord-rpc');
const { Notification } = require('electron');

const Valorant = require('./client/valorant');
const ValorantClient = new Valorant();

class Presence {
    constructor() {
        this.clientId = '1025869206253748295';
        RPC.register(this.clientId);
        this.client = new RPC.Client({ transport: 'ipc' });
        this.date = null;
        this.lastState = null;
        this.maps = null;
        this.presence = null;
        this.isReady = false;
        this.eventHandler();
    }

    async clientLogin() {
        this.client.login({ clientId: this.clientId }).then(this.isReady = true).catch((error) => {
            this.isReady = false;
            new Notification({
                title: 'ValoCord',
                body: 'Please open the Discord app. If it is on and not working, try again in 5 minutes.',
            }).show();
        });
    }

    async clientDestroy() {
        this.client.destroy().then(this.isReady = false).catch(console.log);
    }

    async _init() {
        this.maps = await axios.get('https://valorant-api.com/v1/maps').then(res => res.data.data);

        let interval = setInterval(async () => {

            if (!this.isReady) {
                clearInterval(interval);
                return;
            }

            let data = await ValorantClient.getPlayerDetails();
            if (!data) {
				this.client.clearActivity()
                //this.clientDestroy();
                return;
            };

            

            if (this.lastState !== data.status) {
                this.lastState = data.status;
                this.date = new Date();
            };

            if (data.status === "STARTING_GAME") {

                this.presence = {
                    details: 'Game Starting',
                    largeImageKey: 'https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png',
                    largeImageText: 'ValorCord by RiseRuins',
                    buttons: [{label: "Discord", url: "https://discord.gg/s2sdcwckpf"}],
                    startTimestamp: this.date,
                }

            };

            if (data.status === 'MENUS') {
                this.presence = {
                    details: 'Lobby - ' + data.queueId.replace("onefea", "replication").replace("ggteam", "escalation").toUpperCase(),
                    largeImageKey: 'https://images.cults3d.com/4QqRV9kLYYEuw9ur_X3yjQl1sjk=/516x516/https://files.cults3d.com/uploaders/15024335/illustration-file/a86d53e4-2bd9-4a8f-9550-986686c3131a/gi0mAjIh_400x400.png',
                    largeImageText: 'Valorant',
                    startTimestamp: this.date,
                }

                /*if(data.party.partyAccessibility === 'OPEN'){
                    this.presence.partyId = data.party.ID + data.party.partyAccessibility;
                    this.presence.partySize = data.party.size;
                    this.presence.partyMax = data.party.maxSize
                    this.presence.joinSecret = data.party.ID;   
                }
    
                Coming Soon
                */
            };

            if (data.status === 'PREGAME' && data.match) {
                let map = this.maps.find(map => map.mapUrl === data.match.map);
                this.presence = {
                    details: 'Selecting Agent',
                    state: data.queueId ? data.queueId.replace('CustomGame', 'Custom Game').toUpperCase() : "Custom Game",
                    largeImageKey: map.splash,
                    largeImageText: map.displayName,
                    startTimestamp: this.date,
                }
            };

            if (data.status === 'INGAME' && data.match) {
                let map = this.maps.find(map => map.mapUrl === data.match.map);
                let agent = await axios.get(`https://valorant-api.com/v1/agents/${data.match.charaterID}`).then(res => res.data.data);
                this.presence = {
                    details: "In Game [" + data.match.score.ally + " - " + data.match.score.enemy + ']',
                    state: data.match.queueId ? data.match.queueId.replace('CustomGame', 'Custom Game').toUpperCase() : "Custom Game",
                    largeImageKey: map.splash,
                    largeImageText: map.displayName,
                    smallImageKey: agent.displayIcon,
                    smallImageText: agent.displayName,
                    startTimestamp: this.date,
                }
            };
            console.log('Updating presence...', this.date);
            this.client.setActivity(this.presence).catch(console.log);


        }, 2000);
    }

    async eventHandler() {
        ValorantClient.on('gameReady', () => {
            this.clientLogin();
        });
        this.client.on('ready', () => {
            this._init();
        });

        this.client.on('disconnected', () => {
            this.clientLogin();
        });

    }

}

module.exports = Presence;