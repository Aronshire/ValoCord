const valorant = require('./client/valorant');
const valorantClient = new valorant();


(async () => {
    console.log(await valorantClient.getUserDetails());
})();