import { dialog } from 'electron';

class ConfirmDialog {

  static show(message: string): boolean {
    const options = {
      type: "question",
      buttons: ['Yes', 'Cancel'],
      defaultId: 1,
      title: 'Confirm',
      message: message,
    };

    const result = dialog.showMessageBoxSync(options) === 0;
    return result;
  }
}

export {
  ConfirmDialog,
}
