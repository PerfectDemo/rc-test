'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async show() {
    const file = await this.app.model.File.findByPk(this.ctx.params.id);
    this.ctx.body = file;
  }

  async list() {
    const files = await this.app.model.File.findAll({ order: [
      [ 'id', 'desc' ],
    ] });
    this.ctx.body = files;
  }

  async store() {
    const { ctx, app } = this;
    const { prefix, dir } = this.config.store;
    const { name, content } = ctx.request.body;
    console.log(ctx.request.body);

    const fileName = `${name}.txt`;
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
    const file = await app.model.File.create({ name, url: path.join(prefix, fileName) });
    ctx.body = file;
  }

  async edit() {
    // reupload file
    const { ctx, app } = this;
    const { dir } = this.config.store;

    const file = await app.model.File.findByPk(ctx.params.id);
    const fileName = `${file.name}.txt`;
    const filePath = path.join(dir, fileName);
    console.log(filePath);
    fs.writeFileSync(filePath, ctx.request.body.content, { encoding: 'utf-8' });

    ctx.body = file;
    // save
  }

  async file() {
    const { ctx } = this;
    const fileName = ctx.params.name;
    console.log('file:', fileName);
    const { dir } = this.config.store;
    const filePath = path.join(dir, fileName);
    ctx.attachment(fileName);
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = HomeController;
