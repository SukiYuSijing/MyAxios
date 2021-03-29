/*
 * @Author: your name
 * @Date: 2021-03-27 13:56:24
 * @LastEditTime: 2021-03-28 17:35:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\myAxios\xhr.js
 */

export function ajax(config) {
  try {
    let data;
    if (config.transformData) data = config.transformData(config);
    let { method, baseUrl, headers, async, url } = config;

    url = baseUrl + config.url;
    let xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          resolve(xhr.responseText);
        }
      };
      xhr.open(method, url, async);
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
      if (config.cancelToken) {
        config.cancelToken.then((res) => {
          xhr.abort();
        });
      }
      xhr.send(method.toLowerCase() == 'post' ? data : undefined);
    });
  } catch (error) {
    Promise.reject(error);
  }
}

export function CancelToken(excutor) {
  this.promise = new Promise((resolve, reject) => {
    excutor(resolve);
  });
  return this.promise;
}
