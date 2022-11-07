import { IFrontendEnvironmentConfig } from '@conferentia/models';

export const environment: IFrontendEnvironmentConfig = {
  production: true,
  //TODO: Move these configuration to .env file and consume it from there (2022/11/04 - RO - #39)
  apiUrl: '',
  eventId: 'ca40fed4-177c-4a9f-bcfa-225c2b22419d',
};
