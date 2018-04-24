import { app } from 'electron';
import { Menu } from 'electron';
import { ApplicationBase } from './applicationBase'
import { MainWindow } from './mainWindow'

export class Application extends ApplicationBase {

    constructor(app: Electron.App) {
        super(app);
    }

    onReady() {
        console.log('Application.onReady');

        super.onReady();

        this.window = new MainWindow('file://' + __dirname + '/index.html');

        var menu = Menu.buildFromTemplate([{
            label: 'File',
            submenu: [
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => { this.app.quit(); }
            }]},
        ]);
        Menu.setApplicationMenu(menu);
    }
}

new Application(app);