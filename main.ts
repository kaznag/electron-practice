import { app, BrowserWindow } from 'electron';

class MainApplication {

    mainWindow: Electron.BrowserWindow | null = null;

    constructor(public app: Electron.App) {
        this.app.on('window-all-closed', this.onWindowAllClosed);
        this.app.on('ready', this.onReady);
    }

    onWindowAllClosed() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    }

    onReady() {
        this.mainWindow = new BrowserWindow({width: 800, height: 600});
        this.mainWindow.loadURL('file://' + __dirname + '/index.html');
        this.mainWindow.on('closed', (event: Electron.Event) => {
            this.mainWindow = null;
        });
    }
}

new MainApplication(app);