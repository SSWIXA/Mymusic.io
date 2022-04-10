import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(path){
  return originPush.call(this,path).catch(()=>{})
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/findmusic",
        name: "findmusic",
        component: () => import("../views/Home/main.vue"),
        meta:{
          title:"NiceMusic"
        },
      },
      /*   {
        path:'/ranklist',
        name: 'ranklist',
        component: () => import( '../views/ranklist.vue')
      }, */
      {
        path: "/songlist",
        name: "songlist",
        component: () => import("../views/songlist.vue"),
      },
      {
        path: "/Songer",
        name: "Songer",
        component: () => import("../views/Songer.vue"),
      },
      {
        path: "/Details",
        name: "Details",
        component: () => import("../views/Details.vue"),
      },
      {
        path: "/movie",
        name: "movie",
        component: () => import("../views/MusicMv.vue"),
      },
      {
        path: "/playMv/:id",
        name: "playMv",
        component: () => import("../views/playMv.vue"),
      },

      {
        path: "/index",
        name: "index",
        component: () => import("../views/particulars/index.vue"),
      },
      {
        path: "/ranklist",
        name: "ranklist",
        component: () => import("../views/RankList.vue"),
      }
    ],
  },

  /*  {
    path: '/about',
    name: 'About',
 
    component: () => import( '../views/About.vue')
  } */
];

const router = new VueRouter({
  mode: "hash",
  // history
  base: process.env.BASE_URL,
  routes,
});

export default router;
