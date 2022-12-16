const utils = require('./utils');
const EventEmitter = require('events');
const axios = require('axios');
class Valorant extends EventEmitter {
    constructor() {
        super();
        this.isReady = false;
        this.eventHandler();
    }

    async getUserDetails() {
        const localData = await utils.getLocalData();
        if (!localData) return null;

        let data = new Buffer.from(localData.private, 'base64').toString('utf8');

        return JSON.parse(data);
    }

    async getUserData(){
        const data = utils.getLocalData();

        if (!data) return null;

        return data;
    }

    async getPreGameDetails() {
        const tokens  = await utils.getTokens();
        if (!tokens) return null;
        var matchid = await axios.get(`https://glz-eu-1.eu.a.pvp.net/pregame/v1/players/${tokens.subject}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})
        if(matchid.response && matchid.response.status == 400) {
            tokens = await data()
            matchid = await axios.get(`https://glz-${settings.region}-1.${settings.region}.a.pvp.net/pregame/v1/players/${tokens.subject}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})
        }

        if (!matchid.data) return null;

        var pre_game_data = await axios.get(`https://glz-eu-1.eu.a.pvp.net/pregame/v1/matches/${matchid.data.MatchID}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})
        
        if (!pre_game_data.data) return null;

        return pre_game_data.data;
    };

    async getCoreGameDetails() {
        const tokens  = await utils.getTokens();
        if (!tokens) return null;
        var matchid = await axios.get(`https://glz-eu-1.eu.a.pvp.net/core-game/v1/players/${tokens.subject}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})
        if(matchid.response && matchid.response.status == 400) {
            tokens = await data()
            matchid = await axios.get(`https://glz-${settings.region}-1.${settings.region}.a.pvp.net/core-game/v1/players/${tokens.subject}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})
        }

        if (!matchid.data) return null;
        var core_game_data = await axios.get(`https://glz-eu-1.eu.a.pvp.net/core-game/v1/matches/${matchid.data.MatchID}`, {headers: {Authorization: "Bearer " + tokens.accessToken,"X-Riot-Entitlements-JWT": tokens.token,"X-Riot-ClientVersion": "release-03.00-shipping-22-574489","X-Riot-ClientPlatform": "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9"}}).catch(error => {return error})

        if (!core_game_data.data) return null;

        return core_game_data.data;
    };

    async getPlayerDetails() {
        const tokens  = await utils.getTokens();
        const userDetail = await this.getUserDetails();
        const preGameDetails = await this.getPreGameDetails();
        const coreGameDetails = await this.getCoreGameDetails();
  
        let data = {
            puuid: tokens.subject,
            status: userDetail.sessionLoopState,
            level: userDetail.accountLevel,
            queueId: userDetail.queueId,
            party: {
                ID: userDetail.partyId,
                size: userDetail.partySize,
                maxSize: userDetail.maxPartySize,
                partyAccessibility: userDetail.partyAccessibility
            }
        }

        if (preGameDetails) {
            data.match = {
                ID: preGameDetails.ID,
                map: preGameDetails.MapID,
                mode: preGameDetails.ProvisioningFlow,
                charaterID: null,
                score: { ally: 0, enemy: 0 },
            }
        }

        if (coreGameDetails) {
            data.match = {
                ID: coreGameDetails.MatchID,
                map: coreGameDetails.MapID,
                mode: coreGameDetails.ProvisioningFlow,
                charaterID: coreGameDetails.Players.find(player => player.Subject === data.puuid).CharacterID,
                score: { ally: userDetail.partyOwnerMatchScoreAllyTeam, enemy: userDetail.partyOwnerMatchScoreEnemyTeam },
            }
        }

        return data;
    }

    async eventHandler() {
        setTimeout(() => {
            const userDetail = this.getUserDetails();

            if (!userDetail) return this.isReady = false;

            this.isReady = true;
            this.emit('gameReady', userDetail);
        }, 1000);
    }

}

module.exports = Valorant;