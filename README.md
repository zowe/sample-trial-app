## Sample ZLUX App


## Manual Installation of App

### Part 0: Environment
1) `node`  
   Download & Install node,feel fre to download latest version from `https://nodejs.org/en/download/`   
   Test node - `node -v`,  
1) `npm`  
   Node download in step 1, has npm included  
   Test npm - `npm -v`
1) `git`  
   Test git - `git --version`
1) `tsc`   
   Its this trial project specific dependency  
   Test typescript - `tsc -v`
1) Client software(s)
   * your favorite `lightweight IDE`- vscode
   * your favorite `browser` - chrome/firefox
1) `Git Bash` // windows only requirement   
   *NOTE:* If you plan to run zlux project locally, based on tutorial      
   `https://developer.ibm.com/tutorials/zowe-step-by-step-tutorial/`     

   Download & install git bash from https://git-scm.com/downloads   


### Part 1: Build Projects
1) Download ZLUX Project
   ```
    git clone --recursive git@github.com:zowe/zlux.git
    cd zlux
    git submodule foreach "git checkout master"
   ```

1) Download trial app in your zlux folder
   ```
    git clone https://github.com/zowe/sample-trial-app.git
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
