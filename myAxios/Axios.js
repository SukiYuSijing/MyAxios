import { defaultsConfig } from './config';
import Interceptors from './Interceptors';
import { deepCopy, mergeOption } from './utils';

/*
 * @Author: your name
 * @Date: 2021-03-27 11:24:46
 * @LastEditTime: 2021-03-28 12:10:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\myAxios\Axios.js
 */

class Axios {
  constructor(config) {
    this.defaultsConfig = mergeOption(defaultsConfig, config || {}); //这里
    this.interceptors = new Interceptors();
  }
}

let axios = new Axios();
extend(axios.request, Axios.prototype, axios);

function extend(target, source, ctx) {
  for (let key in source) {
    if (typeof source[key] === 'function') {
      target[key] = source[key].bind(ctx);
      continue;
    }
    target[key] = source[key];
  }
}

Axios.prototype.get = function(url, config) {
  config = config || this.defaultsConfig;
  config.url = url;
  config.method = 'GET';
  let res = this.request(config);
  return res;
};

Axios.prototype.post = function(url, config) {
  config = config || this.defaultsConfig;
};

Axios.prototype.request = function(config) {
  config = mergeOption(this.defaultsConfig, config || {});
  let promise = Promise.resolve(config);
  this.interceptors.request.requestHandler.forEach((fns) => {
    promise = promise.then(fns.sucessfn, fns.failfn);
  });
  promise = promise.then((config) => config.adaptor(config));
  this.interceptors.response.responseHandler.forEach((fns) => {
    promise = promise.then(fns.sucessfn, fns.failfn);
  });
  return promise;
};

export default axios;
