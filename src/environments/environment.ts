// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  googleMaps: {
    // key: 'AIzaSyDmoW-ZR46hbSrhpjFWfj8jDkd9KZ0oDdU'
    key: 'AIzaSyDf5PA_oQXKvy-MnKawzHrsP8KhNsy426Y'
  },

  firebase: {
    apiKey: 'AIzaSyCcK7Dl9t7X7u4asdDR_pi0bs0eLowXrK0',
    authDomain: 'transport-maciejaszek.firebaseapp.com',
    databaseURL: 'https://transport-maciejaszek.firebaseio.com',
    projectId: 'transport-maciejaszek',
    storageBucket: 'transport-maciejaszek.appspot.com',
    messagingSenderId: '185577271690'
  },

  nodeMailer: {
    transporter: 'querytransporter@gmail.com',
    password: 'transporter123',
    recipient: 'a.maciejaszek@gmail.com'
  }
};
