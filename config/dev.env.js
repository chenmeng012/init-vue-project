'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const {DEV_SERVER_PORT} = require("./myConfig");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: `"http://localhost:" + ${DEV_SERVER_PORT}`
})
