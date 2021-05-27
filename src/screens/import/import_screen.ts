import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { event_fit_window } from "../../vars";


export function createImportScreen(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../../../icons/icon.png"),
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    alwaysOnTop: false,
    resizable: false,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../../../public/import_screen.html"))
    .then(_ => {
      console.log("index.html loaded");
    })
    .catch(e => {
      console.log(e);
    });

  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  return mainWindow;
}