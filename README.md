## Sample Trial App

## PART I: Download & Build on local

## Method 1: From github
1) Download & build trial app
   Build `web` folder
   ```
    git clone https://github.com/zowe/sample-trial-app.git
    cd sample-trial-app/webClient
    npm install
    npm run build
   ```

2) Ensure sample-trial-app is empty and exists in remote host (skip this step if you've already fulfilled the requirements)
   Login
   ```
   ssh ibmuser@my.mainframe.com
   ```

   If sample-trial-app does not exist in remote host create an empty directory.
   ```
   mkdir <user-defined-folder>/sample-trial-app
   ```

3) Transfer app to server  
   Transfer `web`, `manifest.yaml` and `pluginDefinition.json` from your local to remote host.
   ```
   // on your local
   cd sample-trial-app
   scp -r web ibmuser@my.mainframe.com:<user-defined-folder>/sample-trial-app
   scp -r manifest.yaml ibmuser@my.mainframe.com:<user-defined-folder>/sample-trial-app
   scp -r pluginDefinition.json ibmuser@my.mainframe.com:<user-defined-folder>/sample-trial-app
   ```
## Method 2: From Artifactory
### 1) Download latest pax from artifactory
Get latest package from [artifactory](https://zowe.jfrog.io/zowe/libs-snapshot-local/org/zowe/sample-trial-app/)

Choose the latest pax build provided from the link above and download it into your local storage.

### 2) Transfer and unpax on z/OS
```
sftp ibmuser@mymainframe.ibm.com
put <pax-name>.pax
```


## PART II: Deploy with Zowe on server

### 1) login
```  
ssh ibmuser@my.mainframe.com       
```

### 2) install component using zowe-install-component.sh script
```
./<zowe-runtime-dir>/bin/zowe-install-component.sh -d <zowe-extensions-dir> -i <zowe-instance-dir> -o <component-pax-file> -l <log-folder>
```

This app uses dataservice api as which can be deployed and started separately:
`https://github.com/zowe/sample-node-api`
