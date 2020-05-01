import './style.scss';
import { ipcRenderer } from 'electron';
import { ChannelKey } from '../common/channel-key';

class App {

  private maximizeButton: HTMLElement | null;

  constructor() {

    const closeButton = document.getElementById('close-button');
    if (closeButton) {
      closeButton.addEventListener('click', this.onCloseButtonClick);
    }

    this.maximizeButton = document.getElementById('maximize-button');
    if (this.maximizeButton) {
      this.maximizeButton.addEventListener('click', this.onMaximizeButtonClick);
    }

    const windowTitle = document.getElementById('window-title');
    if (windowTitle) {
      windowTitle.innerHTML = require('electron').remote.app.name;
    }

    const isMaximized = require('electron').remote.getCurrentWindow().isMaximized();
    this.displayMaximizeButton(!isMaximized);

    ipcRenderer.on(ChannelKey.windowMaximize, () => this.onWindowMaximize());
    ipcRenderer.on(ChannelKey.windowUnmaximize, () => this.onWindowUnmaximize());
  }

  private onCloseButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowCloseRequest);
  }

  private onMaximizeButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowMaximizeRestoreRequest);
  }

  private onWindowMaximize(): void {
    this.displayMaximizeButton(false);
  }

  private onWindowUnmaximize(): void {
    this.displayMaximizeButton(true);
  }

  private displayMaximizeButton(display: boolean): void {
    if (display) {
      this.maximizeButton!.style.display = 'block';
    } else {
      this.maximizeButton!.style.display = 'none';
    }
  }
}

new App();
