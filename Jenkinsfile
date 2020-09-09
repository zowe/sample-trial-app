#!groovy

/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */


node('ibm-jenkins-slave-dind') {
  def lib = library("jenkins-library").org.zowe.jenkins_shared_library

  def pipeline = lib.pipelines.nodejs.NodeJSPipeline.new(this)

  pipeline.admins.add("stevenh")

  pipeline.setup(
    packageName: 'org.zowe.sample-trial-app',
    baseDirectory: 'webClient',
    nodeJsVersion: 'v10.18.1',
    installRegistries: [
      [
        email                      : lib.Constants.DEFAULT_LFJ_NPM_PRIVATE_REGISTRY_EMAIL,
        usernamePasswordCredential : lib.Constants.DEFAULT_LFJ_NPM_PRIVATE_REGISTRY_CREDENTIAL,
        registry                   : lib.Constants.DEFAULT_LFJ_NPM_PRIVATE_REGISTRY_INSTALL,
      ]
    ],
    publishRegistry: [
      email                      : lib.Constants.DEFAULT_LFJ_NPM_PRIVATE_REGISTRY_EMAIL,
      usernamePasswordCredential : lib.Constants.DEFAULT_LFJ_NPM_PRIVATE_REGISTRY_CREDENTIAL,
    ], 
    disableLint: true,
  )

  pipeline.build()

  // we have pax packaging step
  pipeline.packaging(name: 'sample-trial-app')

  // define we need publish stage
  pipeline.publish(
    operation: {
      echo "Default npm publish will be skipped."
    },
    artifacts: [
      '.pax/sample-trial-app.pax'
    ],
    allowPublishWithoutTest: true // There are no tests
  )
  
  pipeline.end()
}
