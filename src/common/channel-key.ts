
class ChannelKey {
  // main to renderer
  static readonly windowFocus = 'windowFocus';
  static readonly windowMaximize = 'windowMaximize';

  // renderer to main
  static readonly windowInitialized = 'windowInitialized';
  static readonly windowCloseRequest = 'windowCloseRequest';
  static readonly windowMaximizeRestoreRequest = 'windowMaximizeRestoreRequest';
  static readonly windowMinimizeRequest = 'windowMinimizeRequest';

  static readonly windowParameterRequest = 'windowParameterRequest';
}

export {
  ChannelKey,
}
