import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

const windows: Map<string, MascotWindow> = new Map()

export function addWindow(win_id: string, w: MascotWindow) {
    windows.set(win_id, w);
}

export function getWindow(win_id: string): MascotWindow|null {
    return windows.get(win_id) || null;
}

export function removeWindow(id: string) {
    if (windows.has(id)) {
        windows.delete(id);
    }
}

export class MascotWindow extends BrowserWindow {
    readonly win_id: string;

    constructor(win_id: string, options?: BrowserWindowConstructorOptions) {
        super(options);
        this.win_id = win_id;
        addWindow(win_id, this);

        this.on('close', () => {
            removeWindow(win_id);
        });

        this.on('closed', () => {
            removeWindow(win_id);
        });
    }
}