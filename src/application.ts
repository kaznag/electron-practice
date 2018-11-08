import { Menu } from 'electron';
import  * as path from 'path';
import { MainWindow } from './mainWindow'

export class Application {

    private mainWindow: MainWindow = null;

    constructor(public app: Electron.App) {
        this.app.on('ready', () => this.onReady());
        this.app.on('window-all-closed', () => this.onWindowAllClosed());
    }

    private onWindowAllClosed() {
        if (process.platform != 'darwin') {
            this.app.quit();
        }
    }

    private onReady() {
        this.mainWindow = new MainWindow(path.join(__dirname, '../index.html'));

        var menu = Menu.buildFromTemplate([{
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => { this.app.quit(); }
                }]
        }
        ]);

        Menu.setApplicationMenu(menu);
    }
}