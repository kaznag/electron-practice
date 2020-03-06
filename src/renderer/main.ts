import './style.scss';
import { ipcRenderer } from 'electron';
import { ChannelKey } from '../common/channel-key';

class App {
  constructor() {
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
      closeButton.addEventListener('click', this.onCloseButtonClick);
    }

    const windowTitle = document.getElementById('window-title');
    if (windowTitle) {
      windowTitle.innerHTML = require('electron').remote.app.name;
    }
  }

  private onCloseButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowCloseRequest);
  }
}

new App();
