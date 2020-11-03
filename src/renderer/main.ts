import './style.scss';

class App {

  private isFocused: boolean = false;

  private windowTitle: HTMLElement | null;
  private maximizeButton: HTMLElement | null;
  private restoreButton: HTMLElement | null;
  private minimizeButton: HTMLElement | null;

  constructor() {

    this.windowTitle = document.getElementById('window-title');

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

    window.api.onWindowMaximize(isMaximized => this.onWindowMaximize(isMaximized));

    window.api.onWindowFocus(isFocused => {
      this.isFocused = isFocused;
      this.updateStyles();
    });

    window.api.invokeWindowParameterRequest()
      .then(windowParameter => {
        if (this.windowTitle) {
          this.windowTitle.innerHTML = windowParameter.title;
        }

        this.isFocused = windowParameter.isFocused;
        this.updateStyles();

        this.displayMaximizeButton(!windowParameter.isMaximized);
        this.displayRestoreButton(windowParameter.isMaximized);

        window.api.sendWindowInitialized();
      });
  }

  private onCloseButtonClick(): void {
    window.api.sendWindowCloseRequest();
  }

  private onMaximizeRestoreButtonClick(): void {
    window.api.sendWindowMaximizeRestoreRequest();
  }

  private onMinimizeButtonClick(): void {
    window.api.sendWindowMinimizeRequest();
  }

  private updateStyles(): void {
    if (this.windowTitle) {
      this.windowTitle.className = 'window-title' + (!this.isFocused ? ' blur' : '');
    }
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
