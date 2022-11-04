import { IFrontendEnvironmentConfig } from '@conferentia/models';

export const environment: IFrontendEnvironmentConfig = {
  production: true,
  //TODO: Move these configuration to .env file and consume it from there (2022/11/04 - RO - #39)
  apiUrl: '',
  eventId: 'c848063b-a2d3-4817-b248-51bef7453fce',
};
