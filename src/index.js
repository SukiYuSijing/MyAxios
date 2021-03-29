/*
 * @Author: your name
 * @Date: 2021-03-20 00:24:11
 * @LastEditTime: 2021-03-28 20:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\helloWorld.js
 */
import Axios from '../myAxios/index.js';
import { CancelToken } from '../myAxios/xhr.js';
Axios.interceptors.request.use(
  function(config) {
    console.log(config);
    config.auth = 'ysj';
    return config;
  },
  function(reason) {
    console.log(reason);
    return config;
  }
);
Axios.interceptors.request.use(
  function(config) {
    console.log(config);
    config.auth1 = 'ysj1';
    return config;
  },
  function(reason) {
    console.log(reason);
    return config;
  }
);

Axios.interceptors.response.use(
  function(res) {
    console.log(res);
    return res;
  },
  function(reason) {
    console.log(reason);
    return res;
  }
);
Axios.interceptors.response.use(
  function(res) {
    console.log(res);
    return res;
  },
  function(reason) {
    console.log(reason);
    return res;
  }
);
// let res = Axios.get('http://localhost:3333/');
// res.then(
//   (res) => {
//     console.log('AXIOS', res);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

var cancel;
// let res = Axios.request({
//   url: 'http://localhost:3333/',
// });
let cancelToken = new CancelToken(function(c) {
  cancel = c;
});
let res = Axios.request({
  url: 'http://localhost:3333',
  method: 'GET',
  data: {
    name: '%ysj',
    age: 18,
    period: '#forever',
  },
  cancelToken: cancelToken,
});
// cancel();
res.then(
  (res) => {
    console.log('AXIOS', res);
  },
  (reason) => {
    console.log(reason);
  }
);
