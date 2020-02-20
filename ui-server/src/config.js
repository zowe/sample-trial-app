/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2019
 */

const fs = require('fs');

module.exports = (config) => {

  if(config && config.csp && config.csp['frame-ancestors']) {
    const frames=config.csp['frame-ancestors'];
    if(frames.length>0) {
      config.csp['frame-ancestors'] = config.csp['frame-ancestors'][0].split(',');
    }
  }
  // load https certs file content
  if (config && config.https) {
    ['key', 'cert', 'pfx'].forEach(key => {
      if (config.https[key]) {
        let file = config.https[key];
        config.https[key] = fs.readFileSync(file);
      }
    });
  }

  return config;
};
