'use strict';
const store = require('../../../store');
module.exports = () => {
  return async (ctx, next) => {
    await next();
    // execute when disconnect.
    console.log('disconnection!');
    const socket = ctx.socket;
    const client = socket.id;
    const nsp = ctx.app.io.of('/');

    Object.keys(store).forEach(id => {
      if (store[id] === client) {
        delete store[id];
        nsp.emit('release', { result: true, id });
      }
    });
  };
};
