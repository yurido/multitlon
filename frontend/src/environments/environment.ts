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
  EXERCISES: [{sid: 'PUSH-UPS', name: 'Push-ups', item: 'kg'},
    {sid: 'PULL-UPS', name: 'Pull-ups', item: 'kg'},
    {sid: 'BARS', name: 'Bars', item: 'kg'},
    {sid: 'BICEPS', name: 'Biceps', item: 'kg'},
    {sid: 'TRICEPS', name: 'Triceps', item: 'kg'},
    {sid: 'ABS', name: 'Abs', item: 'aj'},
    {sid: 'SHOULDERS', name: 'Shoulders', item: 'kg'},
    {sid: 'OVERHEAD_PRESS', name: 'Overhead press', item: 'kg'},
    {sid: 'SQUATS', name: 'Squats', item: 'kg'},
    {sid: 'SWIM', name: 'Swim', item: 'km'},
    {sid: 'RUN', name: 'Run', item: 'km'},
    {sid: 'CYCLING', name: 'Cycling', item: 'km'},
    {sid: 'DEADLIFT', name: 'Deadlift', item: 'km'},
    {sid: 'PLANK', name: 'Plank', item: 'min'},
    {sid: 'CALVES', name: 'Calves', item: 'kg'},
    {sid: 'ZUMBA', name: 'Zumba', item: 'h'},
    {sid: 'BODY-PUMP', name: 'BodyPump', item: 'h'},
    {sid: 'SCOOTER', name: 'Scooter', item: 'km'},
    {sid: 'BURPEE', name: 'Burpee', item: 'n'},
    {sid: 'SKATING', name: 'Skating', item: 'km'},
    {sid: 'SKIING', name: 'Skiing(x-country)', item: 'km'},
    {sid: 'SNOWBOARDING', name: 'Snowbord', item: 'km'},
    {sid: 'DANCING', name: 'Dancing', item: 'h'},
    {sid: 'YOGA', name: 'Yoga', item: 'h'},
    {sid: 'STRETCHING', name: 'Stretching', item: '10min'},
    {sid: 'TENNIS', name: 'Tennis', item: 'h'},
    {sid: 'SHAPE-UP', name: 'Shape Up', item: 'h'},
    {sid: 'KNEE-ROLL-OUT', name: 'Knee roll-out', item: 'n'},
    {sid: 'ZEPN', name: 'zEPN', item: 'h'},
    {sid: 'HYPEREXTENSION', name: 'Hyperextension', item: 'kg'},
    {sid: 'BENCH-PRESS', name: 'Bench press', item: 'kg'}
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
