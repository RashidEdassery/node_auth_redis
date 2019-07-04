import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:3000/api"
});

Vue.prototype.$http = base;

import localForage from "localforage";
Vue.config.productionTip = false;

var _token = "";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (_token) {
      next();
    } else {
      localForage
        .getItem("accessToken")
        .then(function(value) {
          _token = value || "";
          if (_token) {
            next();
          } else {
            router.push({ name: "login" });
          }
        })
        .catch(function(err) {
          console.log(err);
          router.push({ name: "login" });
        });
    }
  } else {
    if (to.meta && to.meta.requiresAuth === false) {
      if (_token) {
        router.push({ name: "sessions" });
      } else {
        localForage
          .getItem("accessToken")
          .then(function(value) {
            _token = value || "";
            if (_token) {
              router.push({ name: "sessions" });
            } else {
              next();
            }
          })
          .catch(function(err) {
            console.log(err);
            next();
          });
      }
    }
  }
});

export const app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
