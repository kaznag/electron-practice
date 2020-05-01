
class ChannelKey {
  // main to renderer
  static readonly windowMaximize = 'windowMaximize';
  static readonly windowUnmaximize = 'windowUnmaximize';

  // renderer to main
  static readonly windowCloseRequest = 'windowCloseRequest';
  static readonly windowMaximizeRestoreRequest = 'windowMaximizeRestoreRequest';
}

export {
  ChannelKey
}
