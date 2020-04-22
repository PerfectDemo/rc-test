'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);

  router.get('/api/v1/files', controller.home.list);
  router.get('/api/v1/files/:id', controller.home.show);
  router.post('/api/v1/files', controller.home.store);
  router.put('/api/v1/files/:id', controller.home.edit);
  router.get('/static/:name', controller.home.file);

  io.of('/').route('lock', io.controller.lock.lock);
};
