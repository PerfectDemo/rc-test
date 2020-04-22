/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587391693347_4691';

  // add your middleware config here
  config.middleware = [];

  config.store = {
    prefix: '/static',
    dir: path.join(appInfo.baseDir, 'app/static'),
  };

  config.cluster = {
    listen: {
      port: 8080,
      hostname: '0.0.0.0',
    },
  };

  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [ 'connection' ],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
    domainWhiteList: [
      '127.0.0.1',
      'localhost',
    ],
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    database: 'rc',
    host: '127.0.0.1',
    port: 3306,
    query: {
      charset: 'utf8mb4',
    },
    define: {
      timestamps: false,
      // 不删除数据库中原有项, 增加新属性 deletedAt 并设置为 当前日期,
      // 只有 TIMESTAMP 属性是允许的时候有效
      paranoid: false,
      freezeTableName: true,
      underscored: true,
    },
    dialectOptions: {
      // dateStrings: true,
      // typeCast: true
    },
    timezone: '+08:00',
    // logging: !(env.APP_STAGE === 'production')
    logging: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
