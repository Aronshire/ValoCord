const { app, BrowserWindow, Notification, ipcMain, Tray, Menu, nativeImage, shell } = require('electron')
const { translate } = require('./client/utils')
const path = require('path')
const url = require('url')
let win = null
let tray = null
const Store = require('electron-store');
const store = global.store = new Store();

function createWindow() {
    win = new BrowserWindow({
        width: 830,
        height: 580,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        //titleBarStyle: 'customButtonsOnHover',
        //frame: false,
        movable: true,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname, 'assets/icon.ico')
    })
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'electron/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.on('closed', () => {
        win = null
    })

    if (require('electron-squirrel-startup')) return app.quit();


    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.ico'))
    tray = new Tray(icon)

    tray.setToolTip('ValoCord - ValorantRPC Application')

    tray.on('click', event => {
        win.isVisible() ? win.hide() : win.show()
    })

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()
    if (process.platform === "win32") {
        app.setAppUserModelId(app.name)
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})


const Valorant = require('./client/valorant');
const ValorantClient = new Valorant();

const Presence = require('./presence');
const PresenceClient = new Presence();


ipcMain.on('getStatus', async (event, arg) => {
    let language = store.get("language") ?? "tr_TR"

    event.sender.send('status', {
        valorant: {
            status: ValorantClient.isReady,
            user: ValorantClient.isReady ? await ValorantClient.getUserData() : null
        },
        discord: {
            status: PresenceClient.isReady,
            user: PresenceClient.client.user
        },
        language: language
    });

})

ipcMain.on('login', async (event, arg) => {

    PresenceClient.clientLogin();

});

ipcMain.on('logout', async (event, arg) => {
    
        PresenceClient.clientDestroy();
    
});

ipcMain.on('discord', async (event, arg) => {

    shell.openExternal('https://discord.gg/s2sdcwckpf')

});

ipcMain.on('changeLanguage', async (event, arg) => {

    store.set("language", arg)


});