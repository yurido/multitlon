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
  EXERCISES: [{sid: 'PUSH-UPS', name: 'push-ups', item: 'kg', withReps: true},
    {sid: 'PULL-UPS', name: 'pull-ups', item: 'kg', withReps: true},
    {sid: 'BARS', name: 'bars', item: 'kg', withReps: true},
    {sid: 'BICEPS', name: 'biceps', item: 'kg', withReps: true},
    {sid: 'TRICEPS', name: 'triceps', item: 'kg', withReps: true},
    {sid: 'ABS', name: 'abs', item: 'aj', withReps: false},
    {sid: 'SHOULDERS', name: 'shoulders', item: 'kg', withReps: true},
    {sid: 'OVERHEAD_PRESS', name: 'overhead press', item: 'kg', withReps: true},
    {sid: 'SQUATS', name: 'squats', item: 'kg', withReps: true},
    {sid: 'SWIM', name: 'swim', item: 'km', withReps: false},
    {sid: 'RUN', name: 'run', item: 'km', withReps: false},
    {sid: 'CYCLING', name: 'cycling', item: 'km', withReps: false},
    {sid: 'DEADLIFT', name: 'deadlift', item: 'km', withReps: true},
    {sid: 'PLANK', name: 'plank', item: 'min', withReps: false},
    {sid: 'CALVES', name: 'calves', item: 'kg', withReps: true},
    {sid: 'ZUMBA', name: 'zumba', item: 'h', withReps: false},
    {sid: 'BODY-PUMP', name: 'bodyPump', item: 'h', withReps: false},
    {sid: 'SCOOTER', name: 'Scooter', item: 'km', withReps: false},
    {sid: 'BURPEE', name: 'burpee', item: 'n', withReps: false},
    {sid: 'SKATING', name: 'skating', item: 'km', withReps: false},
    {sid: 'SKIING', name: 'skiing(x-country)', item: 'km', withReps: false},
    {sid: 'SNOWBOARDING', name: 'snowbord', item: 'km', withReps: false},
    {sid: 'DANCING', name: 'dancing', item: 'h', withReps: false},
    {sid: 'YOGA', name: 'yoga', item: 'h', withReps: false},
    {sid: 'STRETCHING', name: 'stretching', item: '10min', withReps: false},
    {sid: 'TENNIS', name: 'tennis', item: 'h', withReps: false},
    {sid: 'SHAPE-UP', name: 'shape Up', item: 'h', withReps: false},
    {sid: 'KNEE-ROLL-OUT', name: 'knee roll-out', item: 'n', withReps: false},
    {sid: 'ZEPN', name: 'zEPN', item: 'h', withReps: false},
    {sid: 'HYPEREXTENSION', name: 'hyperextension', item: 'kg', withReps: true},
    {sid: 'BENCH-PRESS', name: 'bench press', item: 'kg', withReps: true}
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
