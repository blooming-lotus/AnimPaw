import { app, BrowserWindow, ipcMain, screen } from "electron";
import * as path from "path";
import { MascotWindow } from "../../screen_manager";
import { DEBUG, event_fit_window, mascot_window_id } from "../../vars";


export function createMascotScreen(): BrowserWindow {
  
  const width = DEBUG && 800 || 0;
  const mainWindow = new MascotWindow(mascot_window_id, {
    title: 'Mascot',
    icon: path.join(__dirname, "../../../icons/icon.png"),
    width: width,
    height: DEBUG && 600 || 0,
    transparent: !DEBUG,
    frame: DEBUG,
    alwaysOnTop: true,
    resizable: DEBUG,
    skipTaskbar: !DEBUG,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: true,
    }
  });

  
  if (DEBUG) {
    mainWindow.setPosition(
      screen.getPrimaryDisplay().workAreaSize.width/2 - mainWindow.getSize()[0], 
      mainWindow.getPosition()[1], false);
  }

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
    if (!DEBUG) mainWindow.setSize(data.w, data.h)
  })

  mainWindow.on('close', _ => app.quit())

  // Open the DevTools.
  if (DEBUG) mainWindow.webContents.openDevTools();

  return mainWindow;
}