#!/bin/sh

################################################################################
# This program and the accompanying materials are made available under the terms of the
# Eclipse Public License v2.0 which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright IBM Corporation 2019, 2020
################################################################################

################################################################################
# Variables required on shell:
# - STATIC_DEF_CONFIG_DIR
# - NODE_HOME
# - 


echo 'sample-trial-app configure begin'
NODE_BIN=${NODE_HOME}/bin/node

echo "LAUNCH_COMPONENT: ${i} "
COMPONENT_DIR=$(dirname "${i}")
echo "COMPONENT_DIR: ${COMPONENT_DIR}"

# load config from env
echo 'load sample-trial-app config'
. ${COMPONENT_DIR}/bin/env.sh


if [[ $LAUNCH_COMPONENT_GROUPS == *"DESKTOP"* ]]
then
  # Create desktop app plugin
  TRIAL_PLUGIN_FULLURL="https://${ZOWE_EXPLORER_HOST}:${GATEWAY_PORT}${TRIAL_PLUGIN_BASEURI}"
  ${ROOT_DIR}/bin/utils/zowe-install-iframe-plugin.sh \
    "${TRIAL_PLUGIN_ID}" \
    "${TRIAL_PLUGIN_NAME}" \
    "${TRIAL_PLUGIN_FULLURL}" \
    "${WORKSPACE_DIR}/sample-trial-app" \
    "${COMPONENT_DIR}/web/images/icon.png"
fi

# Remove any previous static defintiion config
if [[ -f ${STATIC_DEF_CONFIG_DIR}/sample-trial-ui.yml ]]; then
  rm ${STATIC_DEF_CONFIG_DIR}/sample-trial-ui.yml 
fi

# Add static definition for jes explorer ui
cat <<EOF >$STATIC_DEF_CONFIG_DIR/sample-trial-ui.ebcdic.yml
#
services:
  - serviceId: sample-trial-app
    title: Sample Trial App UI
    description: Sample Trial App API
    catalogUiTileId:
    instanceBaseUrls:
      - https://$ZOWE_EXPLORER_HOST:$TRIAL_UI_PORT/
    homePageRelativeUrl:
    routedServices:
      - gatewayUrl: ui/v1
        serviceRelativeUrl: $TRIAL_PLUGIN_BASEURI
EOF

iconv -f IBM-1047 -t IBM-850 ${STATIC_DEF_CONFIG_DIR}/sample-trial-ui.ebcdic.yml > $STATIC_DEF_CONFIG_DIR/sample-trial-ui.yml	
rm ${STATIC_DEF_CONFIG_DIR}/sample-trial-ui.ebcdic.yml
chmod 770 $STATIC_DEF_CONFIG_DIR/sample-trial-ui.yml

echo 'sample-trial-app configure end'
