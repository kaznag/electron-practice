import { BrowserWindow, dialog } from 'electron';
import type { MessageBoxSyncOptions } from 'electron';

class ConfirmDialog {
  static show(parent: BrowserWindow, message: string): boolean {
    const options: MessageBoxSyncOptions = {
      type: 'question',
      buttons: ['Yes', 'Cancel'],
      defaultId: 1,
      title: 'Confirm',
      message: message,
    };

    const result = dialog.showMessageBoxSync(parent, options) === 0;
    return result;
  }
}

export { ConfirmDialog };
