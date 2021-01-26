# Extendng Zowe BASE IMAGE


## Build Custom Docker Image
From same folder as `Dockerfiles.extend`
Place gz package of your apps in folder `docker/gz`, `Dockerfiles.extend` add gz packages to `/root/zowe/apps` folder
```
docker build -f Dockerfiles.extend -t myorg/zowe:sample-app .
```

## Run Docker Image
```
docker run --rm --env ZOWE_EXPLORER_HOST=zowe-docker.com \
--env ZOWE_IP_ADDRESS=0.0.0.0 \
--env ZOSMF_HOST=mainframe.ibm.com --env ZOSMF_PORT=443 \
--env ZWED_agent_host=mainframe.ibm.com --env ZWED_agent_http_port=8542 \
-p 7554:7554 -p 8544:8544 -p 7553:7553 myorg/zowe:sample-app 
```

## Wait for docker to start and access in browser
```
https://zowe-docker.com:7554/ui/v1/apicatalog
https://zowe-docker.com:7554/ui/v1/zlux
```
