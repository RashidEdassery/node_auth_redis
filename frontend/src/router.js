import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue";
// import Session from './views/sessions.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: "/",
      name: "login",
      meta: { requiresAuth: false },
      component: Login
    },
    {
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("./views/register")
    },
    {
      path: "/sessions",
      name: "sessions",
      meta: { requiresAuth: true },
      component: () => import("./views/sessions.vue")
    }
  ]
});
