import { app, Menu, ipcMain } from 'electron'
import { MainWindow } from './main-window';
import { ApplicationSettings } from './application-settings';
import { ChannelKey } from '../common/channel-key';
import { WindowParameter } from '../common/message';

class Application {

  private mainWindow: MainWindow | null = null;

  private appSettings: ApplicationSettings | null = null;

  constructor(public app: Electron.App) {
    if (!this.app.requestSingleInstanceLock()) {
      this.app.quit();
    }

    this.appSettings = new ApplicationSettings();

    this.app.on('ready', () => this.onReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('second-instance', () => this.onSecondInstance());

    ipcMain.on(ChannelKey.windowCloseRequest, () => this.onIpcWindowCloseRequest());
    ipcMain.on(ChannelKey.windowMaximizeRestoreRequest, () => this.onIpcWindowMaximizeRestoreRequest());
    ipcMain.on(ChannelKey.windowMinimizeRequest, () => this.onIpcWindowMinimizeRequest());
    ipcMain.once(ChannelKey.windowInitialized, () => this.onIpcWindowInitialized());
    ipcMain.handle(ChannelKey.windowParameterRequest, () => this.onWindowParameterRequest());
  }

  private onReady(): void {
    this.mainWindow = new MainWindow(this.appSettings!);

    this.mainWindow.on('blur', () => this.onWindowBlur());
    this.mainWindow.on('focus', () => this.onWindowFocus());
    this.mainWindow.on('maximize', () => this.onWindowMaximize());
    this.mainWindow.on('unmaximize', () => this.onWindowUnmaximize());


    if (this.appSettings?.getWindowFrame()) {
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
    }
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

  private onWindowBlur(): void {
    this.sendWindowFocus(false);
  }

  private onWindowFocus(): void {
    this.sendWindowFocus(true);
  }

  private onWindowMaximize(): void {
    this.sendWindowMaximize(true);
  }

  private onWindowUnmaximize(): void {
    this.sendWindowMaximize(false);
  }

  private onIpcWindowCloseRequest(): void {
    this.mainWindow!.close();
  }

  private onIpcWindowMaximizeRestoreRequest(): void {
    this.mainWindow!.maximizeRestore();
  }

  private onIpcWindowMinimizeRequest(): void {
    this.mainWindow!.minimize();
  }

  private onIpcWindowInitialized(): void {
    if (this.appSettings!.getWindowIsMaximized()) {
      this.mainWindow!.maximize();
    } else {
      this.mainWindow!.show();
    }
  }

  private onWindowParameterRequest(): WindowParameter {
    return {
      isFocused: this.mainWindow!.isFocused(),
      isMaximized: this.mainWindow!.isMaximized(),
      title: this.app.name,
    };
  }

  private sendWindowFocus(isFocused: boolean): void {
    this.mainWindow!.send(ChannelKey.windowFocus, isFocused);
  }

  private sendWindowMaximize(isMaximized: boolean): void {
    this.mainWindow!.send(ChannelKey.windowMaximize, isMaximized);
  }
}

new Application(app);
