import { BrowserWindow } from 'electron';
import { dialog, ipcMain, webContents } from 'electron';

export class MainWindow {

    private window: Electron.BrowserWindow = null;
    
    constructor(url: string) {
        this.window = new BrowserWindow({width: 800, height: 600});
        this.window.loadFile(url);

        this.window.on('closed', this.onClosed);
    }

    private onClosed() {
        this.window = null;
    }
}
