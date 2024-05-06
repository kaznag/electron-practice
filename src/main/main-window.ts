import { app, BrowserWindow, Event, globalShortcut } from 'electron';
import * as path from 'path';
import { EventEmitter } from 'events';
import { ConfirmDialog } from './confirm-dialog';
import { ApplicationSettings } from './application-settings';
import type { BrowserWindowConstructorOptions } from 'electron';

class MainWindow extends EventEmitter {
  private readonly devToolsShortcutKey = 'CmdOrCtrl+Shift+I';

  private readonly isDev = process.env.NODE_ENV !== 'production';

  private window: BrowserWindow | null = null;

  private normalSize: number[] = [];

  private normalPosition: number[] = [];

  constructor(private appSettings: ApplicationSettings) {
    super();

    const size = this.appSettings.getWindowSize();
    const minSize = this.appSettings.getWindowMinimumSize();

    const options: BrowserWindowConstructorOptions = {
      width: size.width,
      height: size.height,
      minWidth: minSize.width,
      minHeight: minSize.height,
      title: app.name,
      show: false,
      frame: this.appSettings.getWindowFrame(),
      webPreferences: {
        devTools: this.isDev,
        preload: path.resolve(app.getAppPath(), 'preload.js'),
      },
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

    this.window.setMenu(null);
    this.window.loadFile(path.join(app.getAppPath(), 'index.html'));

    this.window.on('close', (e: Event) => this.onClose(e));
    this.window.on('closed', () => this.onClosed());
    this.window.on('blur', () => this.emit('blur'));
    this.window.on('focus', () => this.emit('focus'));
    this.window.on('resize', () => this.onResize());
    this.window.on('move', () => this.onMove());
    this.window.on('maximize', () => this.emit('maximize'));
    this.window.on('unmaximize', () => this.emit('unmaximize'));

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

  maximizeRestore(): void {
    if (this.window!.isMaximized()) {
      this.window!.unmaximize();
    } else {
      this.window!.maximize();
    }
  }

  maximize(): void {
    this.window!.maximize();
  }

  minimize(): void {
    this.window!.minimize();
  }

  isFocused(): boolean {
    return this.window!.isFocused();
  }

  isMaximized(): boolean {
    return this.window!.isMaximized();
  }

  send(channel: string, ...args: any[]): void {
    if (args.length === 1) {
      this.window!.webContents.send(channel, args[0]);
    } else {
      this.window!.webContents.send(channel, args);
    }
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
          this.window!.webContents.toggleDevTools();
        }
      });
    }
  }

  private unregisterShortcut(): void {
    globalShortcut.unregisterAll();
  }
}

export { MainWindow };
