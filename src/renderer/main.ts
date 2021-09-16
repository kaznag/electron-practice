import './style.scss';

class App {
  private isFocused: boolean = false;
  private isMaximized = false;

  private windowTitle: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private maximizeRestoreButton: HTMLElement | null;
  private minimizeButton: HTMLElement | null;

  constructor() {
    this.windowTitle = document.getElementById('window-title');

    this.closeButton = document.getElementById('close-button');
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.onCloseButtonClick);
    }

    this.maximizeRestoreButton = document.getElementById('maximize-restore-button');
    if (this.maximizeRestoreButton) {
      this.maximizeRestoreButton.addEventListener('click', this.onMaximizeRestoreButtonClick);
    }

    this.minimizeButton = document.getElementById('minimize-button');
    if (this.minimizeButton) {
      this.minimizeButton.addEventListener('click', this.onMinimizeButtonClick);
    }

    window.api.onWindowMaximize((isMaximized) => this.onWindowMaximize(isMaximized));

    window.api.onWindowFocus((isFocused) => {
      this.isFocused = isFocused;
      this.updateStyles();
    });

    window.api.invokeWindowParameterRequest().then((windowParameter) => {
      if (this.windowTitle) {
        this.windowTitle.innerHTML = windowParameter.title;
      }

      this.isFocused = windowParameter.isFocused;
      this.isMaximized = windowParameter.isMaximized;

      this.updateStyles();

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

    if (this.closeButton) {
      this.closeButton.className = 'close-button' + (!this.isFocused ? ' blur' : '');
    }

    if (this.minimizeButton) {
      this.minimizeButton.className = 'minimize-button' + (!this.isFocused ? ' blur' : '');
    }

    this.updateMaximizeRestoreButtonStyle();
  }

  private updateMaximizeRestoreButtonStyle(): void {
    if (this.maximizeRestoreButton) {
      this.maximizeRestoreButton.className =
        (this.isMaximized ? 'restore-button' : 'maximize-button') +
        (!this.isFocused ? ' blur' : '');
    }
  }

  private onWindowMaximize(isMaximized: boolean): void {
    this.isMaximized = isMaximized;
    this.updateMaximizeRestoreButtonStyle();
  }
}

new App();
