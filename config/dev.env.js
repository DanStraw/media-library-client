'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOVIEDB_API_KEY: '"13f7ebf559fdd9506dedbccc7218de55"'
})
