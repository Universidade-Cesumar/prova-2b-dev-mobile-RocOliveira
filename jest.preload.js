// Preload para garantir que globalThis.expo exista antes do preset do jest-expo
const { EventEmitter } = require('events');

globalThis.expo = globalThis.expo || {
  EventEmitter,
};
