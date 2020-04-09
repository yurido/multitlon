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
  ],
  EXERCISES: [{sid: 'PUSH-UPS', name: 'push-ups', item: 'kg'},
    {sid: 'PULL-UPS', name: 'pull-ups', item: 'kg'},
    {sid: 'BARS', name: 'bars', item: 'kg'},
    {sid: 'BICEPS', name: 'biceps', item: 'kg'},
    {sid: 'TRICEPS', name: 'triceps', item: 'kg'},
    {sid: 'ABS', name: 'abs', item: 'aj'},
    {sid: 'SHOULDERS', name: 'shoulders', item: 'kg'},
    {sid: 'OVERHEAD_PRESS', name: 'overhead press', item: 'kg'},
    {sid: 'SQUATS', name: 'squats', item: 'kg'},
    {sid: 'SWIM', name: 'swim', item: 'km'},
    {sid: 'RUN', name: 'run', item: 'km'},
    {sid: 'CYCLING', name: 'cycling', item: 'km'},
    {sid: 'DEADLIFT', name: 'deadlift', item: 'km'},
    {sid: 'PLANK', name: 'plank', item: 'min'},
    {sid: 'CALVES', name: 'calves', item: 'kg'},
    {sid: 'ZUMBA', name: 'zumba', item: 'h'},
    {sid: 'BODY-PUMP', name: 'bodyPump', item: 'h'},
    {sid: 'SCOOTER', name: 'Scooter', item: 'km'},
    {sid: 'BURPEE', name: 'burpee', item: 'n'},
    {sid: 'SKATING', name: 'skating', item: 'km'},
    {sid: 'SKIING', name: 'skiing(x-country)', item: 'km'},
    {sid: 'SNOWBOARDING', name: 'snowbord', item: 'km'},
    {sid: 'DANCING', name: 'dancing', item: 'h'},
    {sid: 'YOGA', name: 'yoga', item: 'h'},
    {sid: 'STRETCHING', name: 'stretching', item: '10min'},
    {sid: 'TENNIS', name: 'tennis', item: 'h'},
    {sid: 'SHAPE-UP', name: 'shape Up', item: 'h'},
    {sid: 'KNEE-ROLL-OUT', name: 'knee roll-out', item: 'n'},
    {sid: 'ZEPN', name: 'zEPN', item: 'h'},
    {sid: 'HYPEREXTENSION', name: 'hyperextension', item: 'kg'},
    {sid: 'BENCH-PRESS', name: 'bench press', item: 'kg'}
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
