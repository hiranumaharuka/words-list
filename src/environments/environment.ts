// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDP-mxXazrBru580TmzlH-EdLQeoh90LTQ',
    authDomain: 'wordbook-27dbe.firebaseapp.com',
    databaseURL: 'https://wordbook-27dbe.firebaseio.com',
    projectId: 'wordbook-27dbe',
    storageBucket: 'wordbook-27dbe.appspot.com',
    messagingSenderId: '327012083307',
    appId: '1:327012083307:web:b85c72b166cc8419c1f32e',
    measurementId: 'G-TQK0L0N2F8'
  },
  algolia: {
    appId: '0LC7T2M8BF',
    apiKey: 'bac880c373fc8e0fc8b1ee4ad4e08710'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
