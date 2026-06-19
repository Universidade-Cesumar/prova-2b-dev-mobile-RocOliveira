// Jest setup: provide a minimal manual mock for `react-native` to avoid Fabric/native internals
const React = require('react');

// Minimal global expo object expected by jest-expo preset
globalThis.expo = globalThis.expo || {
  EventEmitter: class {
    addListener() {}
    removeAllListeners() {}
  },
};

function make(name) {
  return function Mock(props) {
    return React.createElement(name, props, props && props.children);
  };
}

const MockRN = {
  View: make('View'),
  Text: make('Text'),
  TextInput: make('TextInput'),
  TouchableOpacity: make('TouchableOpacity'),
  FlatList: make('FlatList'),
  ActivityIndicator: make('ActivityIndicator'),
  Alert: { alert: () => {} },
  StyleSheet: { create: (s) => s, flatten: (s) => s },
  Platform: { OS: 'ios' },
  Keyboard: { dismiss: () => {} },
  Dimensions: { get: () => ({ width: 320, height: 480 }) },
  NativeModules: {},
  // minimal exports to avoid missing module errors
};

jest.doMock('react-native', () => MockRN);

// Try to silence Animated helper if resolver maps it
try { jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); } catch (e) {}

// Prevent expo-modules-core from running native logger code by providing minimal API
try {
  jest.doMock('expo-modules-core', () => ({
    requireNativeModule: () => ({}),
    NativeModulesProxy: { get: () => undefined },
  }));
} catch (e) {}

// Mock fetch used by App to avoid real network calls and act() warnings
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
}
// Mock `expo` package to avoid running its runtime initialization in tests
try {
  jest.doMock('expo', () => ({
    getValue: () => ({ fetch: global.fetch }),
  }));
} catch (e) {}
