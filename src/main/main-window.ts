import { app, BrowserWindow, Event, globalShortcut } from 'electron';
import * as path from 'path';
import { ConfirmDialog } from './confirm-dialog';

class MainWindow {

  private readonly devToolsShortcutKey = 'CmdOrCtrl+Shift+I';

  private readonly isDev = process.env.NODE_ENV !== 'production';

  private window: BrowserWindow | null = null;

  constructor() {
    const options = {
      width: 800,
      height: 400,
      title: app.name,
      show: false,
      webPreferences: {
        nodeIntegration: true,
      }
    };

    this.window = new BrowserWindow(options);
    this.window.setMenu(null);
    this.window.loadFile(path.join(__dirname, 'index.html'));

    this.window.on('close', (e: Event) => this.onClose(e));
    this.window.on('closed', () => this.onClosed());

    this.registerShortcut();
  }

  show(): void {
    if (this.window!.isMinimized()) {
      this.window!.restore();
    }

    this.window!.show();
  }

  private onClose(e: Event): void {
    if (!ConfirmDialog.show(this.window!, 'Are you sure you want to exit?')) {
      e.preventDefault();
    }
  }

  private onClosed(): void {
    this.unregisterShortcut();
    this.window = null;
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
