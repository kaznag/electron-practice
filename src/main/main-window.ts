import { app, BrowserWindow, Event } from 'electron';
import * as path from 'path';
import { ConfirmDialog } from './confirm-dialog';

class MainWindow {

  private window: BrowserWindow | null = null;

  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 400,
      title: app.getName(),
      show: false,
      webPreferences: {
        nodeIntegration: true,
      }
    });

    this.window.setMenu(null);
    this.window.loadFile(path.join(__dirname, './index.html'));

    this.window.on('close', (e: Event) => this.onClose(e));
    this.window.on('closed', () => this.onClosed());
  }

  show(): void {
    if (this.window) {
      if (this.window.isMinimized()) {
        this.window.restore();
      }

      this.window.show();
    }
  }

  private onClose(e: Event): void {
    if (!ConfirmDialog.show('Are you sure you want to exit?')) {
      e.preventDefault();
    }
  }

  private onClosed(): void {
    this.window = null;
  }
}

export {
  MainWindow,
}
