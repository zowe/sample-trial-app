#!/bin/sh

################################################################################
# This program and the accompanying materials are made available under the terms of the
# Eclipse Public License v2.0 which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright IBM Corporation 2018, 2020
################################################################################

################################################################################
# Variables required on shell:
# - NODE_HOME
# - ROOT_DIR
# - ZOWE_EXPLORER_HOST
# - GATEWAY_PORT
# - JES_EXPLORER_UI_PORT
# - KEYSTORE_KEY
# - KEYSTORE_CERTIFICATE
# - KEYSTORE_PASSWORD

echo 'sample-trial-app start begin'
NODE_BIN=${NODE_HOME}/bin/node

echo "LAUNCH_COMPONENT: ${i} "
COMPONENT_DIR=$(dirname "${i}")
echo "COMPONENT_DIR: ${COMPONENT_DIR}"

# load config from env
echo 'load sample-tial-app config'
. ${COMPONENT_DIR}/bin/env.sh

# get current ui server directory
TRIAL_SERVER_DIR="${COMPONENT_DIR}/server"
echo "TRIAL_SERVER_DIR: ${TRIAL_SERVER_DIR}"

TRIAL_APP_DIR="${COMPONENT_DIR}/web/app"
echo "TRIAL_APP_DIR: ${TRIAL_APP_DIR}"

# start service
$NODE_BIN $TRIAL_SERVER_DIR/src/index.js \
  --service "${TRIAL_PLUGIN_NAME}" \
	--path "${TRIAL_PLUGIN_BASEURI}" \
	--port "${TRIAL_UI_PORT}" \
	--key  "${KEYSTORE_KEY}" \
	--cert "${KEYSTORE_CERTIFICATE}" \
	--csp "${ZOWE_EXPLORER_HOST}:*" \
	--zowe "${ZOWE_EXPLORER_HOST}:${GATEWAY_PORT}/${TRIAL_PLUGIN_API}" \
	--dir "${TRIAL_APP_DIR}" \
	-v &

echo 'sample-trial-app start end'
