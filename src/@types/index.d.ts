import { WindowParameter } from "../common/message";

declare global {
  interface Window {
    api: Api;
  }
}

export interface Api {
  onWindowMaximize: (listner: (isMaximize: boolean) => void) => void;
  sendWindowInitialized: () => void;
  sendWindowCloseRequest: () => void;
  sendWindowMaximizeRestoreRequest: () => void;
  sendWindowMinimizeRequest: () => void;
  invokeWindowParameterRequest: () => Promise<WindowParameter>;
  invoke: (channle: string, ...args: any[]) => Promise<any>;
  on: (channel: string, listener: (...args: any[]) => void) => void;
  send: (channel: string, ...args: any[]) => void;
}
