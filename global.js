import config from './config'
global.config = config
global.query = require('./mysql-connect.js')
global._ = require('lodash')