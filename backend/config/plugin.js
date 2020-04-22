'use strict';

/** @type Egg.EggPlugin */

exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
