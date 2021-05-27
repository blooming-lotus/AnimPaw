// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer } from "electron";
import * as path from "path";
import { asset_character_name, event_fit_window } from "../../vars";

window.addEventListener("DOMContentLoaded", () => {

  const catEl = document.getElementById('character')
  setCatImg(catEl)

  window.addEventListener('load', () => {
    // when image sizes are known
    sendImgSize(catEl)
  })
});


function setCatImg(catEl: HTMLElement|null) {
  catEl?.setAttribute('src', path.join(__dirname, `../../../assets/${asset_character_name}`))
}


function sendImgSize(catEl: HTMLElement|null) {
  const w = catEl?.clientWidth
  const h = catEl?.clientHeight
  
  ipcRenderer.send(event_fit_window, {w, h})
}