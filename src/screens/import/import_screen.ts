import { BrowserWindow, ipcMain, screen } from "electron";
import * as path from "path";
import { Mascot } from "../../data/mascot";

import { db } from "../../data/mascot_db";
import { DEBUG, event_drop_mascot, event_mascot_update, import_window_id, mascot_window_id } from "../../vars";
import { imageSize } from 'image-size';
import { getWindow, MascotWindow } from "../../screen_manager";

export function createImportScreen(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new MascotWindow(import_window_id, {
    title: 'Import',
    icon: path.join(__dirname, "../../../icons/icon.png"),
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    alwaysOnTop: false,
    resizable: DEBUG,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      nodeIntegration: true,
    }
  });

  if (DEBUG) {
    mainWindow.setPosition(
      screen.getPrimaryDisplay().workAreaSize.width/2, 
      mainWindow.getPosition()[1], false);
  }

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../../../public/import_screen.html"))
    .then(_ => {
      console.log("index.html loaded");
    })
    .catch(e => {
      console.log(e);
    });


  // Open the DevTools.
  if (DEBUG) mainWindow.webContents.openDevTools();

  return mainWindow;
}


ipcMain.on(event_drop_mascot, (e, data) => {
  whenDropMascot(e, data);
})


function whenDropMascot(e: Electron.IpcMainEvent, data: {path: string, name: string}) {
  console.log('whenDropMascot');
  
  const img_size = imageSize(data.path);
  const mascot = new Mascot(
    data.name,
    data.path,
    {
      width: img_size.width || 0,
      height: img_size.height || 0,
    }
  )

  db.add(mascot);
  db.addLast(mascot);
  getWindow(mascot_window_id)?.webContents.send(event_mascot_update, mascot);
}