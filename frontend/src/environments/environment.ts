// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: {A: 'a', B: 'b'},
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
    {sid: 'ZUMBA', name: 'Zumba', item: 'h'}
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
