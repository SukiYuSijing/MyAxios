/*
 * @Author: your name
 * @Date: 2021-03-20 00:30:01
 * @LastEditTime: 2021-03-28 20:54:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0320\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    //__dirname 代表所有打包的bundle.js的文件位置和入口文件index.js 同一个目录下

    path: path.join(__dirname, 'dist'), //（把打包文件打入dist目录下边）

    filename: 'bundle.js',
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     use: {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-vue', ['@babel/preset-env']],
      //         plugins: ['@babel/plugin-transform-runtime'],
      //       },
      //     },
      //     exclude: '/node_modules/',
      //   },
      { test: /.vue$/, use: ['vue-loader'] },
      { test: /.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      // 使用绝对路径指定项目 node_modules，不做过多(一层层)查询
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.vue', '.js', '.json', '.jsx', '.css'],
    alias: {
      css: path.resolve(__dirname, 'src/assets/css'),
      vue$: 'vue/dist/vue.js',
    },
  },
};
