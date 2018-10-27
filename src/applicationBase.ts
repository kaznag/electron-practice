import { app } from 'electron';
import {BrowserWindowBase } from './browserWindowBase'

export class ApplicationBase {

    constructor(protected app: Electron.App) {
        this.app.on('ready', () => this.onReady());
        this.app.on('window-all-closed', () => this.onWindowAllClosed());
    }

    onReady() {
    }

    onWindowAllClosed() {
        if (process.platform != 'darwin') {
            this.app.quit();
        }
    }
}