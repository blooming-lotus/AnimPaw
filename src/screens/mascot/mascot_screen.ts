import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { event_fit_window } from "../../vars";


export function createMascotScreen(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../../../icons/icon.png"),
    width: 0,
    height: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../../../public/mascot_screen.html"))
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