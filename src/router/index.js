import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import {db} from '../store/fireInit'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "user",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "default",
    },
    
  },
  {
    path: "/reg",
    name: "Registation",
    component: () => import("../views/Registation.vue"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/index.vue"),
    beforeEnter(to,from,next){
      db.auth().onAuthStateChanged((user) => {
       if (user) {
         next()
       }else{
         next('/login')
       }
      })},
    meta: {
      layout: "default",
    },
   
    children: [
      {
        path: "item",
        name: "add",
        component: () => import("../views/dashboard/AddItem"),
      },
      {
        path: "menu",
        name: "add",
        component: () => import("../views/dashboard/AddMenu"),
      },
      {
        path: "submenu",
        name: "add",
        component: () => import("../views/dashboard/AddSub"),
      },
      {
        path: "buyer-requ",
        name: "add",
        component: () => import("../views/dashboard/BuyerRequ"),
      },
      {
        path: "buyer-requ/:id",
        name: "add",
        component: () => import("../views/dashboard/BuyDetails.vue"),
      },
    ],
  },
  {
    path: "/:menu",
    name: "menu",
    component: () => import("../views/MenuItem.vue"),
    meta:{
      layout:'user'
    }
  },
  {
    path: "/:menu/:sub",
    name: "sub",
    component: () => import("../views/MenuItem.vue"),
    meta:{
      layout:'user'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
