import { app } from 'electron'
import { BrowserWindow } from 'electron';
import { Menu } from 'electron';
import * as path from 'path';

export class Application {

  private mainWindow: Electron.BrowserWindow | null = null;

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
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
      }
    });
    this.mainWindow.loadFile(path.join(__dirname, '../index.html'));
    this.mainWindow.on('closed', () => this.onClosed());

    const menu = Menu.buildFromTemplate([{
      label: '&File',
      submenu: [
        {
          label: 'E&xit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => { this.app.quit(); }
        }]
    }
    ]);

    Menu.setApplicationMenu(menu);
  }

  private onClosed() {
    this.mainWindow = null;
  }
}

new Application(app);
