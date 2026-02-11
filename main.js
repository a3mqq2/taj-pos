const { app, BrowserWindow, globalShortcut } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,
    autoHideMenuBar: true,
    icon: __dirname + '/assets/logo.ico',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    }
  })

  mainWindow.loadURL('http://192.168.1.100/taj-sultan/public')

  mainWindow.setMenu(null)

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F5' || (input.control && input.key.toLowerCase() === 'r')) {
      event.preventDefault()
    }
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})