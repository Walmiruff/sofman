// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 api: 'http://localhost:3000/', // mudar para api mySql

 //api: 'https://posts.vix.br/apisoftman/',

  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBWWGKd6Mr3YWYYfLErAg9d8ZoHC93450s',
    authDomain: 'sofman-15-09.firebaseapp.com',
    databaseURL: 'https://sofman-15-09.firebaseio.com',
    projectId: 'sofman-15-09',
    storageBucket: '',
    messagingSenderId: '726160937064',
    appId: '1:726160937064:web:a70d7bdc505b3998'
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
