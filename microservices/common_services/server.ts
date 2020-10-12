import express from 'express'
import {
    intPort
} from './config/port'
import bodyParser from "body-parser";
import cors from "cors";


import errHandler from "../../libs/core/helpers/errHandler";
import routes from "./routes";
import {createMongoDbConnection} from '../../libs/core/helpers'
import {jwtTokenChecking} from '../../libs/core/middleware'
const objServiceApp: express.Application = express();
try {
    createMongoDbConnection()
    objServiceApp.use(cors());
    objServiceApp.use(jwtTokenChecking)
    objServiceApp.use(bodyParser.json({limit: '50mb' }));
    objServiceApp.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    objServiceApp.use(function(err, req, res, next) {
        if (err instanceof SyntaxError && "body" in err) {
          res.status(400).send({
            errCommon: [{ strMessage: "INVALID_JSON" }]
          });
        } else next();
      });
    objServiceApp.use("/", routes);
    objServiceApp.listen(intPort, function () {
        console.log('App is listening on port ' + intPort);
    });
} catch (error) {
    console.log(new errHandler(error).send().body);
}