## Sample ZLUX App

## Manual Installation of App

### Part 0: Environment
1) `node`  
   Download & Install latest version of [Node](https://nodejs.org/en/download/)  
   Test node: `node -v`  
1) `npm`  
   Node download in step 1, has npm included  
   Test npm: `npm -v`
1) `git`  
   Test git: `git --version`
1) `tsc`   
   Trial project specific dependency 
   ```
   npm install -g typescript
   ``` 
   Test typescript: - `tsc -v`
1) Client software(s)
   * your favorite `lightweight IDE`- vscode
   * your favorite `browser` - chrome/firefox

1) If you plan to run zlux project locally, based on tutorial [ZOWE WebUi Tutorial](https://developer.ibm.com/tutorials/zowe-step-by-step-tutorial/)   
**_For building zLUX framework and apps_**    
    * Download & install [Git Bash](https://git-scm.com/downloads) 
    
   
    * Download and install [jdk](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - v8 minimum. 
        * Set the JAVA_HOME environment variable, if it is not already defined. 
        * Test java: `java -version`   
    * Download [ant](https://ant.apache.org/bindownload.cgi) - v1.10 minimum.
        * Set the ANT_HOME environment variable, if it is not already defined. 
        * Add the Ant binary directory to the PATH environment variable. 
        * Test ant: `ant -version`   
    * Download [ant-contrib](https://sourceforge.net/projects/ant-contrib/files/ant-contrib/1.0b3/ant-contrib-1.0b3-bin.zip/download) jar - v1 minimum  
        * Just copy downloaded ant-contrib jar to lib folder under apache-ant 


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

1) Build Node App - 
    ```
    cd sample-trial-app/nodeServer 
    npm install
    npm run build
    ```
    It will create a build in `lib` folder in root directory of plugin - sample-trial-app/lib

1) Configure base url for API     
   * __Remote API endpoint__ - either use external data service, configure it using BASE_URL value in config.js.    
    When using remote API we won't require the node service built in previous step and `dataServices` section in pluginDefinition.json can be omitted completely as well.
   * __Data Service API endpoint__ - or we can use dataservice configured in pluginDefinition.json and built in previous step and places in folder `lib` 

1) Build React App   

   ```
    cd sample-trial-app/webClient
    npm install
    npm run build
    ```

    It will create a build in `web` folder in root directory of plugin - sample-trial-app/web

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
