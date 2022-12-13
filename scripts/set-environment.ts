const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const appName = argv.app;
const isProduction = environment === 'prod';

const targetPath = `./apps/${appName}/src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: ${process.env.API_URL}
   eventId: ${process.env.EVENT_ID}
   auth0: {
     domain: ${process.env.AUTH0_DOMAIN}
     clientId: ${process.env.CLIENT_ID}
     audience: ${process.env.AUDIENCE_URL}
   }
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.log(err);
  }

  console.log(`Wrote variables to ${targetPath}`);
});
