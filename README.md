## Sample Trial App

## PART I: Download & Build on local

1) Download & build trial app
   Build script create `dist` folder. Its a convenient folder containing `app server` to serve `static react app` contained in `web` folder. Web app is built based on `create react app`.
   In addition, it also contains `bin` folder, which contains script use by zowe to `configure` and `start` app.

   ```
    git clone https://github.com/zowe/sample-trial-app.git
    cd webClient
    npm install
    npm run build
   ```

1) Transfer app to server  

   ```
   scp -r dist ibmuser@my.mainframe.com:</usr/lpp/extender>/sample-trial-app
   ```

## PART II: Deploy with Zowe on server

1) `ssh ibmuser@my.mainframe.com`

2) Go to your sample trial app folder
    Install node_modules for backend node app   
    ```
    cd </usr/lpp/extender>/sample-trial-app/
    cd server
    npm install
    ```

3) Manage lifecycle of service with core zowe components

    Use property `EXTERNAL_COMPONENT` located in file `$INSTANCE_DIR/instance.env`       
    Append it with your service lifecycle scripts.     

    In our sample it is:   
    ```
    vi INSTANCE_DIR/instance.env   
    EXTERNAL_COMPONENTS=</usr/lpp/extender>/sample-trial-app/bin      
    ```

    We expect following in service folder `start.sh`, `configure.sh` and `validate.sh`.
    In our case its bin folder with relevant scripts.    
        
    `configure.sh`   
    It adds static definition for sample-trial-app ui server to folder ${INSTANCE_DIR}/workspace/api-mediation/api-defs in IBM-850 encoding.    
    
    It also calls helper script `zowe-install-iframe-plugin.sh` which do the following:

    a) It creates `pluginDefinition.json` which is required zowe web ui app server to know plugin attributes.
    b) It also creates `web` folder with `index.html` required by zowe plugin, contains iframe pointing to sample trial app ui server.
    c) It also installs zowe desktop app using helper script `install-app.sh`

    `start.sh` starts node server app on configured port       
    `env.sh` its custom script use to configure port for our node ui app, feel free to use your desired way  


4) Open browser on your machine

    * Access app directly at configured port, give app configured at port 8080
        `https://mymainframe.ibm.com:8080/ui/v1/sample-trial-app/`

    * Access app via API Gateway port, given gateway port 7554
        `https://mymainframe.ibm.com:7554/ui/v1/sample-trial-app/`

    * Access newly added `Sample Trial App` app on Zowe Desktop 
      `https://mymainframe.ibm.com:8544/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`   

    * Access `Sample Trial App` plugin in `start section` of `Zowe Desktop` where all apps are listed  


## Different parts of deployed app on server

1) Deployed folder:
   ```
   #  folder containing all parts of Component
   cd </usr/lpp/extender>/sample-trial-app/

   # node server
   cd </usr/lpp/extender>/sample-trial-app/server

   # react app
   cd </usr/lpp/extender>/sample-trial-app/web

   # lifecycle scripts
   cd </usr/lpp/extender>/sample-trial-app/bin

   ```
2) Zowe plugin folder:
   ```
   # folder with all parts of sample trial zowe desktop app
   cd $INSTANCE_DIR/workspace/sample-trial-app 

   # Plugin Definition as decribed in https://github.com/zowe/zlux/wiki/Zlux-Plugin-Definition-&-Structure
   cat $INSTANCE_DIR/workspace/sample-trial-app/pluginDefinition.json

   # Web folder with starting page index.html and images folder containing plugin icon
   cd $INSTANCE_DIR/workspace/sample-trial-app/web

   # plugin locator file used by zowe desktop installed by using script install-app.sh. More info at https://github.com/zowe/zlux/wiki/Installing-Plugins

   cat $INSTANCE_DIR/workspace/app-server/plugins/org.zowe.zlux.sample.trialapp.json
   ```

3) Static Definition registration file to register app node server with API mediation layer
    ```
    # this file make it available at endpoint ui/v1/sample-trial-app from behind gateway
    cat $INSTANCE_DIR/workspace/api-mediation/api-defs/sample-trial-ui.yml
    ```  

4) Zowe Lifecycle hook location in file $INSTANCE_DIR/instance.env
  ```
   # search for property EXTERNAL_COMPONENTS
  ```

5) This app uses dataservice api as which is deployed separately:
`https://github.com/zowe/sample-node-api`