'use strict';
const Controller = require('egg').Controller;

const store = require('../../../store');

class LockController extends Controller {
  async lock() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    console.log('message', message);
    console.log('store', store);

    try {
      const { id } = message;

      if (store[id]) {
        if (store[id] === client) {
          socket.emit('lock', { result: true });
        } else {
          socket.emit('lock', { result: false });
        }
      } else {
        store[id] = client;
        socket.emit('lock', { result: true });
        setTimeout(() => {
          delete store[id];
          console.log('release:', store);
          nsp.emit('release', { result: true, id });
        }, 60 * 1000);
      }
    } catch (error) {
      app.logger.error(error);
    }
  }

  async release() {
    const { ctx } = this;
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    console.log('message', message);
    console.log('store', store);

    const { id } = message;

    if (store[id] === client) {
      delete store[id];
    }
  }
}

module.exports = LockController;
