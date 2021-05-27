import { app, BrowserWindow, ipcMain, Menu, NativeImage, Tray } from "electron";
import * as path from "path";
import { createMascotScreen } from "./screens/mascot/mascot_screen";
import { event_fit_window } from "./vars";

let tray: Tray|null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() =>{
  const window = createMascotScreen();
  preventLeaveOntop(window);
  createTray(window);
  macOsRecreateWindow();
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


function macOsRecreateWindow() {
  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMascotScreen()
  })
}


function createTray(window: BrowserWindow) {
  tray = new Tray(path.join(__dirname, "../icons/icon.png"))
  const menu = Menu.buildFromTemplate([
    {
      label: 'Import Gif', click: importGifClick
    },
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

function importGifClick() {
  console.log('importGifClick');
  
}
