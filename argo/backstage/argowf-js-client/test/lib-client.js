'use strict';

import * as client from "../dist/index.js"

const c = new client.ArgoWorkflowServiceClient("http://10.0.0.143:9090", "argo");

async function submitWorkflows(wf = "ci-build"){
    const p = ["message=hello ".concat(wf)]
    let d = await c.submitWftAndWait(wf, p);    
    console.log(d)
}

async function listWorkflows() {
    return await c.listWorkflows();
}

// Submit CI
submitWorkflows("ci-build").then((d) => console.log(d))

// Submit CD
submitWorkflows("cd-build").then((d) => console.log(d))

// listWorkflows().then((d) => {
//     d.forEach((wf) => {
//         console.log(wf)
//     })
// })

// async function test(){
//     const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Il9NMFI2eE0yTzdMNWpUY0FsV2FjTjNqM1V2ZF9ueHhPU3RQTk1QQXh1eHcifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzA0OTU1NzM4LCJpYXQiOjE3MDQ5NDQ5MzgsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJhcmdvIiwic2VydmljZWFjY291bnQiOnsibmFtZSI6ImFyZ28iLCJ1aWQiOiIyZjI4NWIyNy04Mjc3LTQ3YjQtYWZmOC1jNmJjMTYzMzg2YzAifX0sIm5iZiI6MTcwNDk0NDkzOCwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmFyZ286YXJnbyJ9.GsFMYly23a0smsU8o0m-LmsbxBgksUpL0mld1oIhJwhAZQry65tmghTTIC9mdGa8ay-x2vRjCwaIXZrMugiQmPcKLbKRy6NupNYTxoV5pmn-Y894Q1d6emOPM194hbmkYipurR_9WQINWe7dDJVAujYLHYSt1taFmy2VnBzIQwYL9eQI9y5WpxKbTh3j6AAuTYMpMz84qarL4sFYick_R0E2-NiPoxLYWhSUMy8V2BSmxdVq1tfvxcCloJhYo_sEklLRfU0L0gE-MCYi-h0kRfNbe1eYyhqtZKiBMxMoXAphqdt-AGSN5w0EBvlWuDRG2Ibd4DQXOXY6R-eQrgGtEQ';
//     const argoUrl = "http://10.0.0.143:9090/api/v1/workflows/argo";
    
//     const data = await fetch(argoUrl,{
//       method: 'GET',
//       mode: 'no-cors',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Authorization': 'Bearer '.concat(token)
//       },
//     }).then((r) => {
//       return r.json();
//     })

//     console.log(data);
// }

// test();