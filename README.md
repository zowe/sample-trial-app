## Sample Trial App

## PART I: Download & Build on local

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

## PART II: Deploy with Zowe on server

1) `ssh ibmuser@my.mainframe.com`

2) Go to your sample trial app folder
    Install as zowe desktop app   
    ```
    cd ~/zowe/instance/bin
    install-app.sh </usr/lpp/extender>/sample-trial-app/
    ```
    
3) This app uses dataservice api as which is deployed separately:
`https://github.com/zowe/sample-node-api`