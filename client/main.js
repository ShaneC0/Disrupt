const { BrowserWindow, app } = require("electron");
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  win.loadFile("public/index.html");
}

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(createWindow);
