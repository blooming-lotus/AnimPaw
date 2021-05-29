// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcMain, ipcRenderer } from "electron";
import * as path from "path";
import { Mascot } from "../../data/mascot";
import { asset_character_name, DEBUG, event_fit_window, event_mascot_update } from "../../vars";

window.addEventListener("DOMContentLoaded", () => {

  if (DEBUG) {
    document.body.style.backgroundColor = 'red'
  }

  const mascotEl = document.getElementById('character')
  setMascotImg(mascotEl)

  window.addEventListener('load', () => {
    // when image sizes are known
    const w = mascotEl?.clientWidth || 0
    const h = mascotEl?.clientHeight || 0
    sendImgSize(w, h)
  })

  ipcRenderer.on(event_mascot_update, mascotUpdate);
});


function setMascotImg(mascotEl: HTMLElement|null) {
  mascotEl?.setAttribute('src', path.join(__dirname, `../../../assets/${asset_character_name}`))
}

function sendImgSize(w: number, h: number) {
  ipcRenderer.send(event_fit_window, {w, h})
}

function mascotUpdate(_: any, mascot: Mascot) {
  console.log('mascotUpdate');
  
  const mascotEl = document.getElementById('character')
  mascotEl?.setAttribute('src', mascot.file_path)
  
  const w = mascot.size.width
  const h = mascot.size.height
  
  sendImgSize(w, h)
}