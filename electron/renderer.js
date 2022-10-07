const { ipcRenderer } = require('electron');

function sendMessage(message, args = null) {
    ipcRenderer.send(message, args);
}

setInterval(() => {
    sendMessage('getStatus');
}, 1000);

ipcRenderer.on('status', (event, message) => {

    if (message.valorant?.status) {
        $('#gameStatus').text(message.valorant.user.game_name + '#'+ message.valorant.user.game_tag);
    } else {
        $('#gameStatus').text('Open Valorant');
    }

    if (message.discord?.status) {
        $('#discordStatus').text(message.discord.user.username + '#' + message.discord.user.discriminator);
    } else {
        $('#discordStatus').text('Open Discord App');
    }

    if (message.valorant?.status && message.discord?.status) {
        $('#status').text('Ready');
        $('#status').addClass('text-[#3ba55c]');
        $('#status').removeClass('text-[#ed4245]');
    } else {
        $('#status').text('Not Ready');
        $('#status').addClass('text-[#ed4245]');
        $('#status').removeClass('text-[#3ba55c]');
        $('$status').addClass('ml-[2rem]');
    }

});

ipcRenderer.on('test', (event, message) => {
    console.log(message);
});

function login() {
    sendMessage('login');
}