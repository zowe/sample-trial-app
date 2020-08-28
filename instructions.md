
- open gitbash
- we have installed a local instance of zlux, it connects to mainframe
- open terminal in vscode,
   start-zlux , 
   ctrl+click  https://localhost:8544

- open-app, its a react app
- two parts - nodeServer , webClient
- lets install our sample trial app locally
   open another terminal
   run `build-app`
   run `register-app` -> Ended with rc=0, reason code 0, for a succeful install
                -> ./install-app.bat ${APP_PATH}  
   -later - > placeholder - locate plugin Locator file in zlux registered plugins, cd-plugins, 
- add a missing column, go to file   `webClient\src\AccountList.js` - uncomment
- rebuild 
- refresh browser

- stop zlux server ctrl+c;
- Edit pluginDefinition.json - this file let us configure app settings to ZLUX or Zowe Desktop
- /u/ibmuser/workspace/sample-trial-app/pluginDefinition.json
"pluginShortNameDefault": "My Sample app",
"defaultWindowStyle": {
      "width": 400,
      "height": 400
    }
- start zlux server `start-zlux`

lets try to install same app on remote server
-open this https://s0w1:7554/ui/v1/zlux/ZLUX/plugins/org.zowe.zlux.bootstrap/web/
- there is no sample trial app
- ssh s0w1; cd-workspace; ls sample-trial-app; or 

- deploy app from local to remote
   on local terminal - run `deploy-app`
   on remoter termnal - register-app;

- refresh this browser 
()[https://s0w1:7554/ui/v1/zlux/ZLUX/plugins/org.zowe.zlux.bootstrap/web/]

Try out once more
- webClient\src\App.js - change title
- run `deploy-ui`





Scenario 2:

Overview:

These are red
()[https://localhost:18000]
()[https://s0w1:18000]
()[https://s0w1:7554/ui/v1/sample-node-api]


Step 1

end of step 1
()[https://localhost:18000] - green



step 3
end of step 3
()[https://s0w1:7554/ui/v1/sample-node-api] - green


Summary:
We can host any api behind api ml just by using static.yml file
These are red
()[https://localhost:18000] - green
()[https://s0w1:18000] - green
()[https://s0w1:7554/ui/v1/sample-node-api] - green







