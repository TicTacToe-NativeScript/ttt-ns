'use strict';
let Everlive = require('../lib/everlive.all.min');
let globals = require('../common/globals');

class BaseService {
  constructor(scheme) {
    this.everlive = new Everlive({
      appId: globals.BS_API_KEY,
      scheme: scheme || 'http'
    });
  }
}

module.exports = {
  BaseService: BaseService
};