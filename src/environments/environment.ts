// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBase: "http://localhost:4200/api/",
  firebase: {
    apiKey: "AIzaSyCEdzLxWp45SalUEAu3RxnRURhn5kWLPv4",
    authDomain: "lunafest-2f4b9.firebaseapp.com",
    databaseURL: "https://lunafest-2f4b9.firebaseio.com",
    projectId: "lunafest-2f4b9",
    storageBucket: "lunafest-2f4b9.appspot.com",
    messagingSenderId: "696139753176"
  }
};
