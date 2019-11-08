import { app } from 'electron'
import { BrowserWindow } from 'electron';
import { Menu } from 'electron';
import * as path from 'path';

export class Application {

  private mainWindow: Electron.BrowserWindow | null = null;

  constructor(public app: Electron.App) {
    if (!this.app.requestSingleInstanceLock()) {
      this.app.quit();
    }

    this.app.on('ready', () => this.onReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('second-instance', () => this.onSecondInstance());
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
    this.mainWindow.loadFile(path.join(__dirname, './index.html'));
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

  private onSecondInstance() {
    if (this.mainWindow) {
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore();
      }

      this.mainWindow.focus();
    }
  }
}

new Application(app);
