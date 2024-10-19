'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 默认全局服务地址，NODE_ENV目前项目的运行环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8222"'
})
