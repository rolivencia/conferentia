export interface IFrontendEnvironmentConfig {
  production: boolean;
  apiUrl: string;
  //TODO: Check if eventId is still required after moving the config to .env files (2022/11/04 - RO - #39)
  eventId: string;
  timeZone: number;
  auth0: {
    domain: string;
    clientId: string;
    audience: string;
  };
}
