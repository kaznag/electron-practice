import { BrowserWindow } from 'electron';

export class BrowserWindowBase {

    private window: Electron.BrowserWindow = null;

    constructor(url: string) {
        this.window = new BrowserWindow({width: 800, height: 600});
        this.window.loadURL(url);

        this.window.on('closed', () => this.onClosed());
    }

    onClosed() {
        this.window = null;
    }
}