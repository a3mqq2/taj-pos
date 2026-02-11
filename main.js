const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })

  mainWindow.loadURL('http://taj-sultan.test')

  mainWindow.setMenu(null)

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F5' || (input.control && input.key === 'r')) {
      event.preventDefault()
    }
  })
}

app.whenReady().then(() => {
  createWindow()
  globalShortcut.register('CommandOrControl+Shift+I', () => {})
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('print-receipt', async (event, url) => {
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  })

  await printWindow.loadURL(url)

  printWindow.webContents.print(
    {
      silent: true,
      printBackground: true
    },
    () => {
      printWindow.close()
    }
  )
})