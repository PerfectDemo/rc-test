'use strict';
module.exports = app => {
  const { STRING } = app.Sequelize;

  const File = app.model.define('file', {
    name: { type: STRING(255), defaultValue: '' },
    url: { type: STRING(1000), defaultValue: '' },
  });

  return File;
};
