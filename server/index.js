/*
 * @Author: your name
 * @Date: 2021-03-26 19:55:01
 * @LastEditTime: 2021-03-28 18:43:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\server\index.js
 */
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const cors = require('koa2-cors'); //跨域处理
app.use(koaBody());
app.use(
  cors({
    origin: '*',
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Pragma', 'Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
);

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  }
  await next();
});

app.use(async (ctx) => {
  // console.log(ctx.path);
  let url = ctx.url.split('?')[0];
  let data = ctx.url.split('?')[1];
  if (ctx.path === '/') {
    //处理不同的url
    // console.log(data, decodeURIComponent(data));
    data = ctx.method === 'GET' ? data : ctx.request.body;

    let res = await getData(ctx);
    console.log(res);
    await (ctx.body = res);
    console.log(2);
  } else if (ctx.url === '/user') {
    //处理不同的方法
    if (ctx.method === 'GET') {
      ctx.body = '这是用户列表页';
    } else if (ctx.method === 'POST') {
      ctx.body = '创建用户';
    } else {
      //方法不允许
      ctx.status = 405;
    }
  } else if (ctx.url.match(/\/user\/\w+/)) {
    // 解析请求参数
    const userId = ctx.url.match(/\/user\/(\w+)/)[1];
    ctx.body = `这是用户${userId}`;
  } else {
    ctx.status = 404;
  }
});
app.listen(3333);

function getData(ctx) {
  var p = new Promise((resolve) => {
    setTimeout(function() {
      console.log(111111111111);
      resolve(ctx.query || '这是主页 ');
    }, 5000);
  });
  return p;
}
