/*
 * @Author: your name
 * @Date: 2021-03-26 21:30:05
 * @LastEditTime: 2021-03-28 17:23:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\myAxios\config.js
 */

import { transformData } from './utils';
import { ajax } from './xhr';

var defaultsConfig = {
  baseUrl: '',
  headers: {
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
  },
  method: 'GET',
  async: true,
  adaptor: ajax,
  transformData: transformData,
};
export { defaultsConfig };
