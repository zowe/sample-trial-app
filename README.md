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

# On z/OS
mkdir sample-node-api
cd sample-node-api
pax -ppx -rf ../<pax-name>.pax
```


## PART II: Deploy with Zowe on server

## Method 1: Manually
1) `ssh ibmuser@my.mainframe.com`

2) Go to your sample trial app folder
    Install as zowe desktop app   
    ```
    cd ~/zowe/instance/bin
    install-app.sh </usr/lpp/extender>/sample-trial-app/
    ```
    
3) This app uses dataservice api as which can be deployed and started separately:
`https://github.com/zowe/sample-node-api`

## Method 2: Using Zowe Lifecycle scripts
### 1) Register as EXTERNAL_COMPONENTS with zowe

Use property `EXTERNAL_COMPONENTS` located in file `$INSTANCE_DIR/instance.env`       
Append it (comma separated) with the directory containing your service lifecycle scripts.

In our sample it is:   
```
 vi INSTANCE_DIR/instance.env   
 EXTERNAL_COMPONENTS=</usr/lpp/extender>/sample-node-api/bin,</usr/lpp/extender>/sample-trial-app/bin      
```

We expect following in service folder `start.sh`, `configure.sh` and `validate.sh`.
In our case its bin folder with relevant scripts.    
    
- `configure.sh` - It uses `install-app.sh` script to register app with ZLUX. Install script requires path to root directory containing `pluginDefinition.json` folder         
- `start.sh` - It is added as its required by Zowe. Our app will be served directly by zlux-app-server. So, we don't need to start anything. 