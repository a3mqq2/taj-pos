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
      devTools: false
    }
  })

  mainWindow.loadURL('http://192.168.1.100/taj-sultan/public')

  mainWindow.setMenu(null)

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.shift && input.key.toLowerCase() === 'i') ||
      (input.control && input.key.toLowerCase() === 'j')
    ) {
      event.preventDefault()
    }
  })
}

app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('CommandOrControl+Shift+I', () => {})
  globalShortcut.register('F12', () => {})
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
