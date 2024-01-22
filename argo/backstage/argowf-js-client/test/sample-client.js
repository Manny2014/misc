'use strict';
import * as argowf from "../dist/lib/ArgoWorkflowsClient.js";
import { createLogger, transports, format } from "winston";
const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });
  

let client = new argowf.ArgoWorkflowsClient("http://localhost:9090", "argo", logger);

const p = ["message=hello ts"]

try{
    client.submitWftAndWait("workflow-template-inner-dag", p) // workflow-template-inner-dag,workflow-template-submittable
            .then((d)=>{
                //console.log(d);
            })
}catch(e){
    console.error(e);
}

