const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  printReceipt: url => ipcRenderer.invoke('print-receipt', url)
})