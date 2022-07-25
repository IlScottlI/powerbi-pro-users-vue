import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import builderBadge from './assets/PBI_Builder_Badge_sq.png';
import wizardBadge from './assets/PBI_Wizard_Badge_sq.png';
import masterBadge from './assets/PBI_Master_Badge_sq.png';
import Swal from "sweetalert2";
import "@microsoft/mgt";
import {
  Providers,
  Msal2Provider,
  publicClientApplication,
} from "@microsoft/mgt";

Providers.globalProvider = new Msal2Provider({
  publicClientApplication: publicClientApplication,
  clientId: "16ae8cdf-0dca-4d1c-b9db-0a71121b6c54",
  scopes: ["User.Read"],
  authority:
    "https://login.microsoftonline.com/3596192b-fdf5-4e2c-a6fa-acb706c963d8",
  domainHint: "pg.com",
  redirectUrl: "http://localhost:8080/"
});

async function checkMsal() {
  
  let accounts = await Providers.globalProvider.getAllAccounts();

  const loginRequest = {
    scopes: ["Sites.ReadWrite.All"],
    domainHint: "pg.com",
  };

  if (accounts.length > 0) {

    let accessToken =
      await Providers.globalProvider.publicClientApplication.acquireTokenSilent(
        loginRequest
      );

    let account = await Providers.me();

    Vue.filter('capitalize', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    })

    Vue.filter('returnBool', function (heading, builder, wizard, master, userEmail) {
      let res = '';
      switch (heading) {
        case 'KNOWLEDGE WORKER':
          res = builder.includes(userEmail) ? builderBadge : '';
          break;
        case 'POWER USER':
          res = wizard.includes(userEmail) ? wizardBadge : '';
          break;
        case 'EXPERT USER':
          res = master.includes(userEmail) ? masterBadge : '';
          break;
      }
      return res;
    });

    Vue.use(Vuex);

    new Vue({
      router,
      store,
      vuetify,
      Providers,
      account,
      accessToken,
      Swal,
      render: (h) =>
        h(App, {
          data: {
            account,
          },
        }),
    }).$mount("#app");

  } else {
    Providers.globalProvider.publicClientApplication.loginRedirect(
      loginRequest
    );
  }
}

Providers.onProviderUpdated(checkMsal);

// \/ OLD  \/ OLD \/ OLD \/ OLD \/

// const msalConfig = {
//   client_id: "16ae8cdf-0dca-4d1c-b9db-0a71121b6c54",
//   scopes: ["User.Read"],
//   authority:
//     "https://login.microsoftonline.com/3596192b-fdf5-4e2c-a6fa-acb706c963d8",
//     redirectUrl: "http://localhost:8080/"
// };
// const msalInstance = new msal.PublicClientApplication(msalConfig);
// var loginRequest = {
//   scopes: ["People.Read", "User.ReadBasic.All", "Mail.ReadWrite", "Sites.ReadWrite.All"], // optional Array<string>
//   domainHint: "pg.com",
// };
// const isAuthenticated = () => {
//   if (Providers.globalProvider.state === ProviderState.SignedIn) {
//     Vue.use(Vuex);
//     new Vue({
//       vuetify,
//       router,
//       store,
//       Providers,
//       render: (h) => h(App),
//     }).$mount("#app");
//   } else {
//     try {
//       msalInstance.loginRedirect(loginRequest);
//     } catch (err) {
//       console.log(err, 'Line 44');
//     }
//   }
// };
// Providers.onProviderUpdated(isAuthenticated);