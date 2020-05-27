import './style.scss';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { ChannelKey } from '../common/channel-key';

class App {

  private maximizeButton: HTMLElement | null;
  private restoreButton: HTMLElement | null;
  private minimizeButton: HTMLElement | null;

  constructor() {

    const closeButton = document.getElementById('close-button');
    if (closeButton) {
      closeButton.addEventListener('click', this.onCloseButtonClick);
    }

    this.maximizeButton = document.getElementById('maximize-button');
    if (this.maximizeButton) {
      this.maximizeButton.addEventListener('click', this.onMaximizeRestoreButtonClick);
    }

    this.restoreButton = document.getElementById('restore-button');
    if (this.restoreButton) {
      this.restoreButton.addEventListener('click', this.onMaximizeRestoreButtonClick);
    }

    this.minimizeButton = document.getElementById('minimize-button');
    if (this.minimizeButton) {
      this.minimizeButton.addEventListener('click', this.onMinimizeButtonClick);
    }

    const windowTitle = document.getElementById('window-title');
    if (windowTitle) {
      windowTitle.innerHTML = require('electron').remote.app.name;
    }

    const isMaximized = require('electron').remote.getCurrentWindow().isMaximized();
    this.displayMaximizeButton(!isMaximized);
    this.displayRestoreButton(isMaximized);

    ipcRenderer.on(ChannelKey.windowMaximize,
      (_event: IpcRendererEvent, isMaximized: boolean) => this.onWindowMaximize(isMaximized));
  }

  private onCloseButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowCloseRequest);
  }

  private onMaximizeRestoreButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowMaximizeRestoreRequest);
  }

  private onMinimizeButtonClick(): void {
    ipcRenderer.send(ChannelKey.windowMinimizeRequest);
  }

  private onWindowMaximize(isMaximized: boolean): void {
    this.displayMaximizeButton(!isMaximized);
    this.displayRestoreButton(isMaximized);
  }

  private displayMaximizeButton(display: boolean): void {
    const style = display ? 'block' : 'none';
    this.maximizeButton!.style.display = style;
  }

  private displayRestoreButton(display: boolean): void {
    const style = display ? 'block' : 'none';
    this.restoreButton!.style.display = style;
  }
}

new App();
