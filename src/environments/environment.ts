// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment, Firebase } from "./interface";

export const environment: Environment = {
  production: true,
  apiKey: "AIzaSyD6gbf-oJ73HTKX6zxgCmIq0H9Ph3J5kcI",
  fvDbUrl: "https://friendme-c87e3-default-rtdb.firebaseio.com",
  fvStUrl: "gs://friendme-c87e3.appspot.com",
};

export const firebase: Firebase = {
  apiKey: "AIzaSyD6gbf-oJ73HTKX6zxgCmIq0H9Ph3J5kcI",
  authDomain: "friendme-c87e3.firebaseapp.com",
  projectId: "friendme-c87e3",
  storageBucket: "friendme-c87e3.appspot.com",
  messagingSenderId: "577594382946",
  appId: "1:577594382946:web:7b588133e7ab1a16a24f3b",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
