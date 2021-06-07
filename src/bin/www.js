#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config()
require('@babel/polyfill')

import app from '../app'
import http from 'http'
import { normalizePort, onError, onListening } from './fns'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', () => onListening(server))
