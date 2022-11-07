// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IFrontendEnvironmentConfig } from '@conferentia/models';

export const environment: IFrontendEnvironmentConfig = {
  production: false,
  //TODO: Move these configuration to .env file and consume it from there (2022/11/04 - RO - #39)
  apiUrl: 'http://localhost:3334/api',
  eventId: 'ca40fed4-177c-4a9f-bcfa-225c2b22419d',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
