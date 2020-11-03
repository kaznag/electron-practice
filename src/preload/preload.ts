import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { ChannelKey } from "../common/channel-key";
import { WindowParameter } from "../common/message";

contextBridge.exposeInMainWorld(
  'api',
  {
    onWindowFocus: (listener: (isFocused: boolean) => void) => {
      ipcRenderer.on(ChannelKey.windowFocus, (_event: IpcRendererEvent, isFocused: boolean) => {
        listener(isFocused);
      });
    },
    onWindowMaximize: (listener: (isMaximized: boolean) => void) => {
      ipcRenderer.on(ChannelKey.windowMaximize, (_event: IpcRendererEvent, isMaximized: boolean) => {
        listener(isMaximized);
      });
    },
    sendWindowInitialized: () => {
      ipcRenderer.send(ChannelKey.windowInitialized);
    },
    sendWindowCloseRequest: () => {
      ipcRenderer.send(ChannelKey.windowCloseRequest);
    },
    sendWindowMaximizeRestoreRequest: () => {
      ipcRenderer.send(ChannelKey.windowMaximizeRestoreRequest);
    },
    sendWindowMinimizeRequest: () => {
      ipcRenderer.send(ChannelKey.windowMinimizeRequest);
    },
    invokeWindowParameterRequest: async (): Promise<WindowParameter> => {
      return await ipcRenderer.invoke(ChannelKey.windowParameterRequest);
    },
    invoke: async (channel: string, ...args: any[]): Promise<any> => {
      return await ipcRenderer.invoke(channel, args);
    },
    on: (channel: string, listener: (...args: any[]) => void) => {
      ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: any[]) => {
        console.log(args.length);
        if (args.length === 1) {
          listener(args[0]);
        } else {
          listener(args);
        }
      })
    },
    send: (channel: string, ...args: any[]) => {
      ipcRenderer.send(channel, args);
    },
  }
)
