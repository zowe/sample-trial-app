import { Response, Request } from "express";
import { Router } from "express-serve-static-core";

import addRoutes from './routes/index.route';

const noteRequest = (context) => (req, res, next) => {
  context.logger.info('Saw request, method=' + 'my trial app' + req.method);
  next();
}

const express = require('express');
const Promise = require('bluebird');

class MyTrialService {
  private context: any;
  private router: Router;

  constructor(context: any) {
    this.context = context;
    const router = express.Router();
    const contextLogger = noteRequest(context);
    router.use(contextLogger);

    context.addBodyParseMiddleware(router);
    router.post('/', function (req: Request, res: Response) {
      let messageFromClient = req.body ? req.body.messageFromClient : "<No/Empty Message Received from Client>"
      let responseBody = {
        "_objectType": "org.zowe.zlux.sample.service.hello",
        "_metaDataVersion": "1.0.0",
        "requestBody": req.body,
        "requestURL": req.originalUrl,
        "serverResponse": `Router received
        
        '${messageFromClient}'
        
        from client`
      }
      res.status(200).json(responseBody);
    });

    addRoutes(router, context);
    this.router = router;
  }

  getRouter(): Router {
    return this.router;
  }
}


exports.myTrialRouter = function (context): Router {
  return new Promise(function (resolve) {
    let dataservice = new MyTrialService(context);
    resolve(dataservice.getRouter());
  });
}