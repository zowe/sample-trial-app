#!/usr/bin/env node

/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */

const path = require('path');
const fs = require('fs');
const https = require('https');
const { constants: cryptoConstants } = require('crypto');

// load package meta
const pkg = require('../package.json');
const version = pkg && pkg.version;
const name = pkg && pkg.name;
const rootDir = path.resolve(__dirname, '..');

// define args
var argv = require('yargs')
  .version(version)
  .scriptName(name)
  .usage('Usage: $0 [options]')
  .option('s', {
    alias: 'service',
    description: 'service-for path',
    default: ''
  })
  .option('b', {
    alias: 'path',
    description: 'base path uri',
  })
  .option('d', {
    alias: 'dir',
    description: 'base dir',
    demandOption: true,
    default: '../app'
  })
  .option('p', {
    alias: 'port',
    description: 'listening port'
  })
  .option('k', {
    alias: 'key',
    default: '',
    description: 'server key'
  })
  .option('c', {
    alias: 'cert',
    default: '',
    description: 'server cert',
  })
  .option('x', {
    alias: 'pfx',
    default: '',
    description: 'server pfx',
  })
  .option('w', {
    alias: 'pass',
    default: '',
    description: 'server pfx passphrase',
  })
  .option('f', {
    alias: 'csp',
    default: '',
    description: 'csp whitelist ancestors frames',
    demandOption: true
  })
  .option('v', {
    alias: 'verbose',
    default: false,
    description: 'show request logs',
    type: 'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .check(validateParams)
  .argv;


const paramConfig = {
  'service-for': argv.service,
  'paths': [{
    'uri': argv.path,
    'dir': argv.dir
  }],
  'port': argv.port,
  'https': {
    'key': argv.key,
    'cert': argv.cert,
    'pfx': argv.pfx,
    'passphrase': argv.pass,
  },
  'csp': {
    'frame-ancestors': [argv.csp]
  }
};

function validateParams (argv) {

  let isValid = true;

  const serviceFor=argv.s;

  if((argv.b==='' || !argv.b) && isValid) {
    isValid = false;
    process.stderr.write(`[${serviceFor}] paths configuration is missing\n`);
  }

  if((argv.p==='' || !argv.p) && isValid) {
    isValid = false;
    process.stderr.write(`[${serviceFor}] port configuration is missing\n`);
  }

  if( (argv.k==='' && argv.c==='' && argv.x==='' && argv.w==='') && isValid) {
    isValid = false;
    process.stderr.write(`[${serviceFor}] https configuration is missing\n`);
  }

  if( ( (argv.k==='' && argv.c>'') || (argv.k>'' && argv.c==='')
      || (argv.x==='' && argv.w>'' && argv.k==='' && argv.c==='')
      || (argv.x==='' && argv.w>'' && !(argv.k>'' && argv.c>'')) 
      || (argv.x>'' && argv.w==='') ) && isValid) {
    isValid = false;
    process.stderr.write(`[${serviceFor}] https configuration is missing\n`);
  }

  if(!isValid) {
    process.stderr.write(`[${serviceFor}] is failed to start, error:\n`);
    process.exit(1);
    return false;
  }

  return true;
}

// load config
let config;
try {
  config = require('./config')(paramConfig);
} catch (err) {
  process.stderr.write('failed to process config\n');
  process.stderr.write(`${err}\n\n`);
  process.exit(1);
}
const serviceFor = config['service-for'] || name;

// mime
const mimeList = {
  js: 'text/javascript',
  css: 'text/css',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpg',
  svg: 'image/svg+xml'
};
const mimeDefault = 'text/html';
const mimeError = 'text/plain';

// server static folder
process.stdout.write(`[${serviceFor}] paths will be served:\n`);
const paths = [];
for (let one of config.paths) {
  const baseDir = path.resolve(rootDir, one.dir);
  process.stdout.write(`[${serviceFor}]   - ${one.uri} => ${baseDir}\n`);
  paths.push({ uri: one.uri, dir: baseDir });
}

// define app
const requestHandler = (request, response) => {
  let url = request.url;
  if (url.substr(-1) === '/') {
    url = url + 'index.html';
  }

  // write log
  const writeLog = (url, code, file) => {
    if (!argv.verbose) {
      return;
    }

    const ts = new Date();
    const tss = ts.toUTCString();
    process.stdout.write(`[${serviceFor}][${tss}] ${request.url} ${code} ${file}\n`);
  };

  // locate dir based on path
  let baseuri = null;
  let basedir = null;
  let file = null;
  for (let one of paths) {
    if (url.substr(0, one.uri.length) === one.uri) {
      baseuri = one.uri;
      basedir = one.dir;
      break;
    }
  }
  if (baseuri) {
    file = path.resolve(basedir, url.substr(
      baseuri.substr(-1) === '/' ? baseuri.length : baseuri.length + 1
    ));
  }

  // decide content type
  const ext = url.split(/\./).slice(-1)[0].toLowerCase();
  let contentType = (ext && mimeList[ext]) || mimeDefault;

  // check CSP settings
  if (config.csp) {
    // check frame-ancestors settings
    if (config.csp['frame-ancestors']) {
      const frameAncestors = config.csp['frame-ancestors'].join(' ').trim().toLowerCase();
      if (frameAncestors) {
        response.setHeader('Content-Security-Policy', `frame-ancestors ${frameAncestors}`);
      }
    }
  }

  response.setHeader('Access-Control-Allow-Origin', 'https://localhost:8080');

  process.stdout.write('request path\n');
  if (file) {
    process.stdout.write(`[${file}] request path\n`);
    // read file
    fs.readFile(file, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          writeLog(request.url, 404, file);
          response.writeHead(404, { 'Content-Type': mimeError });
          response.end('File not found');
        } else if (error.code == 'EISDIR') {
          writeLog(request.url, 301, file);
          response.writeHead(301, {
            'Content-Type': mimeError,
            'Location': `${request.url}/`
          });
          response.end('Moved Permanently');
        } else {
          writeLog(request.url, 500, `error#${error.code}`);
          response.writeHead(500, { 'Content-Type': mimeError });
          response.end(`Read file failed with error: ${error.code} ..\n`);
          response.end();
        }
      } else {
        writeLog(request.url, 200, file);
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content);
      }
    });
  } else {
    writeLog(request.url, 404, 'error#');
    response.writeHead(404, { 'Content-Type': mimeError });
    response.end('File not found');
  }
};

// start server
try {
  if (!config.https ||
    !((config.https.cert && config.https.key) || (config.https.pfx && config.https.passphrase))) {
    throw new Error('https configuration is missing');
  }
  if (!config.port) {
    throw new Error('port configuration is missing');
  }
  if (paths.length === 0) {
    throw new Error('paths configuration is missing');
  }

  config.https.secureOptions = cryptoConstants.SSL_OP_NO_TLSv1 | cryptoConstants.SSL_OP_NO_TLSv1_1;
  config.https.ciphers = [
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES128-SHA256',
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-AES128-SHA256',
    'ECDHE-ECDSA-AES256-SHA384'].join(':');
    
  https.createServer(config.https, requestHandler)
    .listen(config.port, '0.0.0.0', () => {
      process.stdout.write(`[${serviceFor}] is started and listening on ${config.port}...\n\n`);
    });
} catch (err) {
  process.stderr.write(`[${serviceFor}] is failed to start, error:\n`);
  process.stderr.write(`[${serviceFor}] ${err}\n\n`);
  process.exit(1);
}
