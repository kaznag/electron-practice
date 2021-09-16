import ElectronStore from 'electron-store';

type Settings = {
  window: {
    status: {
      size: {
        width: number;
        height: number;
      };
      position: {
        x: number;
        y: number;
      };
      center: boolean;
      isMaximized: boolean;
    };
    styles: {
      frame: boolean;
    };
  };
};

type Default = Settings & {
  window: {
    styles: {
      minimumSize: {
        width: number;
        height: number;
      };
    };
  };
};

class ApplicationSettings {
  private readonly default: Default = {
    window: {
      status: {
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: 800,
          height: 600,
        },
        center: true,
        isMaximized: false,
      },
      styles: {
        frame: false,
        minimumSize: {
          width: 320,
          height: 240,
        },
      },
    },
  };

  private store: ElectronStore;

  private settings: Settings;

  constructor() {
    this.store = new ElectronStore();

    this.settings = {
      window: {
        status: {
          size: {
            width: <number>(
              this.store.get('window.status.size.width', this.default.window.status.size.width)
            ),
            height: <number>(
              this.store.get('window.status.size.height', this.default.window.status.size.height)
            ),
          },
          position: {
            x: <number>(
              this.store.get('window.status.position.x', this.default.window.status.position.x)
            ),
            y: <number>(
              this.store.get('window.status.position.y', this.default.window.status.position.y)
            ),
          },
          center: <boolean>(
            this.store.get('window.status.center', this.default.window.status.center)
          ),
          isMaximized: <boolean>(
            this.store.get('window.status.isMaximized', this.default.window.status.isMaximized)
          ),
        },
        styles: {
          frame: <boolean>this.store.get('window.style.frame', this.default.window.styles.frame),
        },
      },
    };
  }

  save(): void {
    this.store.set(this.settings);
  }

  getWindowSize(): { width: number; height: number } {
    return this.settings.window.status.size;
  }

  setWindowSize(width: number, height: number): void {
    this.settings.window.status.size = { width: width, height: height };
  }

  getWindowPosition(): { x: number; y: number } {
    return this.settings.window.status.position;
  }

  setWindowPosition(x: number, y: number) {
    this.settings.window.status.position = { x: x, y: y };
  }

  getWindowCenter(): boolean {
    return this.settings.window.status.center;
  }

  setWindowCenter(center: boolean): void {
    this.settings.window.status.center = center;
  }

  getWindowIsMaximized(): boolean {
    return this.settings.window.status.isMaximized;
  }

  setWindowIsMaximized(isMaximized: boolean): void {
    this.settings.window.status.isMaximized = isMaximized;
  }

  getWindowFrame(): boolean {
    return this.settings.window.styles.frame;
  }

  getWindowMinimumSize(): { width: number; height: number } {
    return this.default.window.styles.minimumSize;
  }
}

export { ApplicationSettings };
