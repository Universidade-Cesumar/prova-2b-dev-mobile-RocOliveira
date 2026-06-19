const { EventEmitter } = require('events');

const expoMock = {
  EventEmitter,
  getValue: () => ({ fetch: global.fetch || (async () => {}) }),
};

globalThis.expo = expoMock;

module.exports = expoMock;
