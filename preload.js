const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('printer', {
  print: () => ipcRenderer.invoke('silent-print')
})