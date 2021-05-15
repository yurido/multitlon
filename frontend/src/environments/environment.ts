// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  MONTHS: [{id: 0, name: 'january'},
    {id: 1, name: 'february'},
    {id: 2, name: 'march'},
    {id: 3, name: 'april'},
    {id: 4, name: 'may'},
    {id: 5, name: 'jun'},
    {id: 6, name: 'july'},
    {id: 7, name: 'august'},
    {id: 8, name: 'september'},
    {id: 9, name: 'october'},
    {id: 10, name: 'november'},
    {id: 11, name: 'december'}
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
