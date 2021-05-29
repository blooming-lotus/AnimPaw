import { ipcRenderer } from "electron";
import { DEBUG, event_drop_mascot } from "../../vars";

window.addEventListener("DOMContentLoaded", () => {

    if (DEBUG) {
        document.body.style.backgroundColor = 'red'
    }

    const drag = document.getElementById('drop');
    drag?.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

       e.dataTransfer && whenFilesDrop(e.dataTransfer)
    });

    drag?.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('dragover');

    });

    drag?.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('File is in the Drop Space');

    });

    drag?.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('File has left the Drop Space');

    });
});


function whenFilesDrop(data: DataTransfer) {
    console.log('whenFilesDrop');
    
    for (const f of data.files || []) {
        console.log(`File Path of dragged files: `, f.path)
    }

    console.log(data);
    
    const f = data.files[0];

    const send_data = {
        path: f.path,
        name: f.name,
    }

    ipcRenderer.send(event_drop_mascot, send_data)
}
