/*
 * @Author: your name
 * @Date: 2021-03-27 11:37:28
 * @LastEditTime: 2021-03-28 14:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\myAxios\utils.js
 */
export function deepCopy(obj) {
  let o = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (String.call(obj[key]) === '[Object object]') {
      o[key] = deepCopy(obj[key]);
    } else {
      o[key] = obj[key];
    }
  }
  return o;
}

export function mergeOption(defaults, config) {
  let o = {};
  defaults = deepCopy(defaults);
  config = deepCopy(config);
  for (let key in config) {
    if (['headers'].indexOf(key) > -1) {
      defaults[key] = mergeOption(defaults[key], config[key]);
    } else {
      defaults[key] = config[key];
    }
  }
  return defaults;
}

export function transformData(config) {
  let { data, headers, method, url } = config;
  method = method.toLowerCase();
  if (!data) return data;
  if (typeof data !== 'object') {
    data = {
      data: data,
    };
  }
  let result;
  if (method === 'get') {
    let str = '';
    for (let key in data) {
      str += key + '=' + encodeURIComponent(data[key]) + '&';
    }
    config.url = url + '?' + str;
    return;
  }
  if (method === 'post') {
    let contentType = headers && headers['Content-Type'];
    if (contentType) {
      if (contentType.toLowerCase() === 'application/json') {
        return JSON.stringify(data);
      } else if (contentType.toLowerCase() === 'application/form-data') {
        result = new FormData();
        for (let key in data) {
          result.append(key, data[key]);
        }
      }
    }
  }
}
