import { app, BrowserWindow, Event, globalShortcut } from 'electron';
import * as path from 'path';
import { ConfirmDialog } from './confirm-dialog';
import { ApplicationSettings } from './application-settings';

class MainWindow {

  private readonly devToolsShortcutKey = 'CmdOrCtrl+Shift+I';

  private readonly isDev = process.env.NODE_ENV !== 'production';

  private window: BrowserWindow | null = null;

  private normalSize: number[] = [];

  private normalPosition: number[] = [];

  constructor(
    private appSettings: ApplicationSettings
  ) {
    const size = this.appSettings.getWindowSize();
    const minSize = this.appSettings.getWindowMinimumSize();

    const options = {
      width: size.width,
      height: size.height,
      minWidth: minSize.width,
      minHeight: minSize.height,
      title: app.name,
      show: false,
      frame: this.appSettings.getWindowFrame(),
      webPreferences: {
        nodeIntegration: true,
      }
    };

    this.window = new BrowserWindow(options);

    if (this.appSettings.getWindowCenter()) {
      this.window.center();
    } else {
      const pos = this.appSettings.getWindowPosition();
      this.window.setPosition(pos.x, pos.y);
    }

    this.normalPosition = this.window.getPosition();
    this.normalSize = this.window.getSize();

    if (this.appSettings.getWindowIsMaximized()) {
      this.window.maximize();
    }

    this.window.setMenu(null);
    this.window.loadFile(path.join(__dirname, 'index.html'));

    this.window.on('close', (e: Event) => this.onClose(e));
    this.window.on('closed', () => this.onClosed());
    this.window.on('resize', () => this.onResize());
    this.window.on('move', () => this.onMove());

    this.registerShortcut();
  }

  show(): void {
    if (this.window!.isMinimized()) {
      this.window!.restore();
    }

    this.window!.show();
  }

  close(): void {
    this.window!.close();
  }

  private onClose(e: Event): void {
    if (!ConfirmDialog.show(this.window!, 'Are you sure you want to exit?')) {
      e.preventDefault();
      return;
    }

    this.appSettings.setWindowSize(this.normalSize[0], this.normalSize[1]);
    this.appSettings.setWindowPosition(this.normalPosition[0], this.normalPosition[1]);
    this.appSettings.setWindowIsMaximized(this.window!.isMaximized());
    this.appSettings.setWindowCenter(false);
    this.appSettings.save();
  }

  private onClosed(): void {
    this.unregisterShortcut();
    this.window = null;
  }

  private onResize(): void {
    if (this.window!.isNormal()) {
      this.normalSize = this.window!.getSize();
    }
  }

  private onMove(): void {
    if (this.window!.isNormal()) {
      this.normalPosition = this.window!.getPosition();
    }
  }

  private registerShortcut(): void {
    if (this.isDev) {
      globalShortcut.register(this.devToolsShortcutKey, () => {
        if (this.window!.isFocused()) {
          if (this.window!.webContents.isDevToolsOpened()) {
            this.window!.webContents.closeDevTools();
          } else {
            this.window!.webContents.openDevTools();
          }
        }
      });
    }
  }

  private unregisterShortcut(): void {
    globalShortcut.unregisterAll();
  }
}

export {
  MainWindow,
}
