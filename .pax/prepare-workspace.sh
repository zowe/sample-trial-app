#!/bin/bash -e

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
# Build script
# 
# - build client
#################################################################################

# contants
SCRIPT_NAME=$(basename "$0")
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR" && cd .. && pwd)
PAX_WORKSPACE_DIR=.pax
cd "${ROOT_DIR}/webClient"
PACKAGE_NAME=$(node -e "console.log(require('./package.json').name)")
PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
PACKAGE_DESC=$(node -e "console.log(require('./package.json').description)")
ZOWE_PLUGIN_ID="com.ibm.${PACKAGE_NAME}"

cd "${ROOT_DIR}"

# prepare pax workspace
echo "[${SCRIPT_NAME}] cleaning PAX workspace ..."
rm -fr "${PAX_WORKSPACE_DIR}/content"
mkdir -p "${PAX_WORKSPACE_DIR}/content"

# copy web sample-trial-app to target folder
echo "[${SCRIPT_NAME}] copying sample trial app"
mkdir -p "${PAX_WORKSPACE_DIR}/content/web"
cp -r web "${PAX_WORKSPACE_DIR}/content"
cp  pluginDefinition.json "${PAX_WORKSPACE_DIR}/content"
cp  manifest.yaml "${PAX_WORKSPACE_DIR}/content"
cp  README.md "${PAX_WORKSPACE_DIR}/content"
cp  LICENSE "${PAX_WORKSPACE_DIR}/content"

# copy source sample-trial-app to target folder
echo "[${SCRIPT_NAME}] copying source to sample trial app"
## remove node_modules to provide source only
rm -rf webClient/node_modules
mkdir -p "${PAX_WORKSPACE_DIR}/content/webClient"
cp -r webClient "${PAX_WORKSPACE_DIR}/content"

# move content to another folder
rm -fr "${PAX_WORKSPACE_DIR}/ascii"
mkdir -p "${PAX_WORKSPACE_DIR}/ascii"

# update build information
# BRANCH_NAME and BUILD_NUMBER is Jenkins environment variable
commit_hash=$(git rev-parse --verify HEAD)
current_timestamp=$(date +%s%3N)
sed -e "s|{{build\.branch}}|${BRANCH_NAME}|g" \
    -e "s|{{build\.number}}|${BUILD_NUMBER}|g" \
    -e "s|{{build\.commitHash}}|${commit_hash}|g" \
    -e "s|{{build\.timestamp}}|${current_timestamp}|g" \
    "${PAX_WORKSPACE_DIR}/content/manifest.yaml" > "${PAX_WORKSPACE_DIR}/content/manifest.yaml.tmp"
mv "${PAX_WORKSPACE_DIR}/content/manifest.yaml.tmp" "${PAX_WORKSPACE_DIR}/content/manifest.yaml"
echo "[${SCRIPT_NAME}] manifest:"
cat "${PAX_WORKSPACE_DIR}/content/manifest.yaml"
echo
  
rsync -rv \
  --include '*.json' --include '*.html' --include '*.jcl' --include '*.template' \
  --exclude '*.zip' --exclude '*.png' --exclude '*.tgz' --exclude '*.tar.gz' --exclude '*.pax' \
  --prune-empty-dirs --remove-source-files \
  "${PAX_WORKSPACE_DIR}/content/" \
  "${PAX_WORKSPACE_DIR}/ascii"

echo "[${SCRIPT_NAME}] ${PAX_WORKSPACE_DIR} folder is prepared."
exit 0
