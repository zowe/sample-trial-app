
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








open-app
Local 1
- start-zlux
- login - and no app there

Local 2
- build-app
- register-app

Browser:
localhost:8544
open-start menu - refresh applications
app will show up
browse a app,

go back to code add missing column
- build-app

go back to browser 
reload the whole localhost:8544
column will be there

- lets look at plugin deg=finition file it defines configuration registration
- register-app

Local 1:
stop zlux - ctrl+c
start-zlux
check name is changed and window open with different size


browser 
remote zowe desktop
check app is there , its not there

local 2
deploy-app

ssh s0w1
register-app
Ended with rc=0

browser 
remote zowe desktop
open-start menu - refresh applications
app will show up
browse a app,







