import { app, Menu } from 'electron'
import { MainWindow } from './main-window';

class Application {

  private mainWindow: MainWindow | null = null;

  constructor(public app: Electron.App) {
    if (!this.app.requestSingleInstanceLock()) {
      this.app.quit();
    }

    this.app.on('ready', () => this.onReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('second-instance', () => this.onSecondInstance());
  }

  private onReady(): void {
    this.mainWindow = new MainWindow();

    const menu = Menu.buildFromTemplate([{
      label: '&File',
      submenu: [
        {
          label: 'E&xit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => { this.app.quit(); }
        }
      ]
    }
    ]);

    Menu.setApplicationMenu(menu);
    this.mainWindow.show();
  }

  private onWindowAllClosed(): void {
    if (process.platform != 'darwin') {
      this.app.quit();
    }
  }

  private onSecondInstance(): void {
    if (this.mainWindow) {
      this.mainWindow.show();
    }
  }
}

new Application(app);
