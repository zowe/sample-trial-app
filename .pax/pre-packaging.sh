#!/bin/sh -e

#######################################################################
# This program and the accompanying materials are made available
# under the terms of the Eclipse Public License v2.0 which
# accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright Contributors to the Zowe Project. 2020
#######################################################################

# contants
SCRIPT_NAME=$(basename "$0")

echo "[${SCRIPT_NAME}] tag png as binary ..."
cd content/web/images
chtag -b explorer-JES.png