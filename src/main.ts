import { app } from 'electron';
import { Menu } from 'electron';
import { ApplicationBase } from './applicationBase'
import { MainWindow } from './mainWindow'

export class Application extends ApplicationBase {

    private window: MainWindow = null;

    constructor(app: Electron.App) {
        super(app);
    }

    public onReady() {
        console.log('Application.onReady');

        super.onReady();

        this.window = new MainWindow('file://' + __dirname + '/index.html');

        var menu = Menu.buildFromTemplate([{
            label: 'File',
            submenu: [
                {
                    label: 'Open File...',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => { this.window.onOpenFileMenuItem(); }
                },
                {
                    type: "separator"
                },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => { this.app.quit(); }
                }]}
        ]);
        Menu.setApplicationMenu(menu);
    }
}

new Application(app);