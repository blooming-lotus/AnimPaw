import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import * as path from "path";
import { event_fit_window } from "./vars";

let tray: Tray|null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() =>{
  const window = createWindow();
  createTray(window);
  macOsRecreateWindow()
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../icons/icon.png"),
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
    },
    
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"))
  .then(_ => {
    console.log("index.html loaded");
  })
  .catch( e => {
    console.log(e);
  });

  ipcMain.on(event_fit_window, (_, data) => {
    console.log(`fit-window, data: ${data.w} ${data.h}`)
    mainWindow.setSize(data.w, data.h)
  })

  preventLeaveOntop(mainWindow)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow;
}


function macOsRecreateWindow() {
  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}


function createTray(window: BrowserWindow) {
  tray = new Tray(path.join(__dirname, "../icons/icon.png"))
  const menu = Menu.buildFromTemplate([
    {
      label: 'Hide', click: function() {
        window.hide()
      }
    },
    {
      label: 'Show', click: function() {
        window.show()
      }
    },
    {
      label: 'Exit', click: function() {
        app.quit()
      }
    }
  ]);
  tray.setToolTip("Dancin' Cat")
  tray.setContextMenu(menu)
}


function preventLeaveOntop(window: BrowserWindow) {
  window.on('minimize', function() {
    setTimeout(() => {
      window.show()
    }, 1);
  })

  window.on('unmaximize', function() {
    setTimeout(() => {
      window.show()
    }, 1);
  })

  // window.on('hide', function(e, isAlwaysOnTop) {
  //   setTimeout(()=> {
  //     window.show()
  //   }, 1);
  // });
}