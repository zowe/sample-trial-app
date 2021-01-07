## Sample Trial App

## PART I: Download & Build on local

## Method 1: From github
1) Download & build trial app
   Build `web` folder
   ```
    git clone https://github.com/zowe/sample-trial-app.git
    cd webClient
    npm install
    npm run build
   ```

2) Transfer app to server  
   Transfer `web` folder and `pluginDefinition.json`
   ```
   cd sample-trial-app
   scp -r web ibmuser@my.mainframe.com:</usr/lpp/extender>/sample-trial-app
   scp -r pluginDefinition.json ibmuser@my.mainframe.com:</usr/lpp/extender>/sample-trial-app
   ```
## Method 2: From Artifactory
### 1) Download latest pax from artifactory
Get latest package from [artifactory](https://zowe.jfrog.io/zowe/webapp/#/artifacts/browse/tree/General/libs-snapshot-local/org/zowe/sample-trial-app/0.1.0-SNAPSHOT)

Copy latest pax url and use curl to download:
```
# on local or directly on z/OS
curl -O https://zowe.jfrog.io/zowe/libs-snapshot-local/org/zowe/sample-trial-app/0.1.0-SNAPSHOT/sample-trial-app-0.1.0-snapshot-1-20200909205759.pax
```

### 2) Transfer and unpax on z/OS
```
# From local - if downloaded on z/OS skip this
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
./<zowe-runtime-dir>/bin/zowe-install-component.sh -c <component-name> -i <zowe-instance-dir> -o <component-pax-file> -l <log-folder>

```

This app uses dataservice api as which can be deployed and started separately:
`https://github.com/zowe/sample-node-api`