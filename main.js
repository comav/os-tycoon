
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html');
}

electron.whenReady().then(createWindow);

electron.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        electron.quit
    }
})

electron.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})