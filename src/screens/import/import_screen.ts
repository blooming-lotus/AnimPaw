import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { event_fit_window } from "../../vars";


export function createImportScreen(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../../icons/icon.png"),
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    alwaysOnTop: false,
    resizable: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: true,
    },

  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"))
    .then(_ => {
      console.log("index.html loaded");
    })
    .catch(e => {
      console.log(e);
    });

  ipcMain.on(event_fit_window, (_, data) => {
    console.log(`fit-window, data: ${data.w} ${data.h}`)
    mainWindow.setSize(data.w, data.h)
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow;
}