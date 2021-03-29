/*
 * @Author: your name
 * @Date: 2021-03-27 13:17:02
 * @LastEditTime: 2021-03-28 12:10:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\myAxios\Interceptors.js
 */
class Interceptors {
  constructor() {
    this.request = new Request();
    this.response = new Response();
  }
}

class Request {
  constructor() {
    this.requestHandler = [];
  }
}

Request.prototype.use = function(sucessfn, failfn) {
  this.requestHandler.push({
    sucessfn,
    failfn,
  });
};

class Response {
  constructor() {
    this.responseHandler = [];
  }
}

Response.prototype.use = function(sucessfn, failfn) {
  this.responseHandler.push({
    sucessfn,
    failfn,
  });
};

export default Interceptors;
