const {GoogleAuth} = require('google-auth-library');

/**
* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
* this library will automatically choose the right client based on the environment.
*/
async function main() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });


  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  console.log(client)
  const url = `https://containeranalysis.googleapis.com/v1beta1/projects/${projectId}/occurrences:vulnerabilitySummary`;
  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error);