// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile = require('../../../app/model/file');

declare module 'egg' {
  interface IModel {
    File: ReturnType<typeof ExportFile>;
  }
}
