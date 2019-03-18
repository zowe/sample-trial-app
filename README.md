## Sample ZLUX App


## Manual Installation of App

### Part 1: Build Projects
1) Download ZLUX Project
   ```
    git clone --recursive git@github.com:zowe/zlux.git
    cd zlux
    git submodule foreach "git checkout master"
   ```

1) Download trial app in your zlux folder
   ```
    git clone https://github.com/zowe/sample-trial-react-app.git
   ```

1) Assign MVD_DESKTOP_DIR environment variable
    ```
     set MVD_DESKTOP_DIR=\path\to\zlux\zlux-app-manager\virtual-desktop\
    ```

1) Build Node App - This will create folder sample-trial-app/lib
    ```
    cd sample-trial-app/nodeServer 
    npm install
    npm run build
    ```
    
1) Build React App - this will create folder sample-trial-app/web   

   ```
    cd sample-trial-app/webClient
    npm install
    npm run build
    ```

### Part 2: Deployment
1) `ssh ibmuser@my.mainframe.com`

2) Go to your zowe installation folder
    ```
    cd /u/zowe/ibmuser/1.0.0/
    mkdir sample-trial-app
    ```

3) Transfer compiled project from local to your zowe installation server.  
Replace `/u/zowe/ibmuser/1.0.0/` with your zowe installation folder  
Replace `ibmuser@my.mainframe.com` with your username and mainframe-ip  

    ```
    cd local-machine/sample-trial-app

    scp -r web ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/sample-trial-app
    scp -r lib ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/sample-trial-app
    scp pluginDefinition.json ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/sample-trial-app
    scp org.zowe.zlux.sample.trialapp.json ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/zlux-app-server/deploy/product/ZLUX/plugins
    scp org.zowe.zlux.sample.trialapp.json ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/zlux-app-server/deploy/instance/ZLUX/plugins
    scp org.zowe.zlux.sample.trialapp.json ibmuser@my.mainframe.com:/u/zowe/ibmuser/1.0.0/zlux-app-server/plugins

    ```

4) Restart ZOWE  
Please restart Zowe, after all the files are transferred/deployed    