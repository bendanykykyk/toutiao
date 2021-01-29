import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import { Dialog } from "vant";
import store from "store";
// import { getItem } from "utils/storage";
Vue.use(VueRouter);

const Login = () => import("views/login/Login");

const Layout = () => import("views/layout/Layout");
const Home = () => import("views/home/Home");
const Profile = () => import("views/profile/Profile");
const Qa = () => import("views/qa/Qa");
const Video = () => import("views/video/Video");
const Search = () => import("views/search/Search");
const Detail = () => import("views/detail/Detail");
const My = () => import("views/my/My");
const Chat = () => import("views/chat/Chat");
const UserList = () => import("views/userList/UserList");

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    component: Layout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "/profile", name: "Profile", component: Profile },
      { path: "/qa", name: "Qa", component: Qa },
      { path: "/video", name: "Video", component: Video }
    ]
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/detail/:articleId",
    component: Detail
  },
  {
    path: "/my",
    component: My
  },
  {
    path: "/chat",
    component: Chat
  },
  {
    path: "/chat",
    component: Chat
  },
  {
    // 我的作品、收藏、历史
    path: "/userList/:type?",
    component: UserList,
    props: true,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 解决VUE路由跳转出现Redirected when going from "/xx 的bug
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }

  return originalPush.call(this, location).catch(err => err);
};
//  路由守卫，给所有路径上带 meta: { requiresAuth: true }的地方，全部需要验证登录
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || !to.meta.requiresAuth) {
    return next();
  }

  if (store.state.user) {
    return next();
  }

  Dialog.confirm({
    title: "该功能需要登录，确认登录吗？"
  })
    .then(() => {
      next({
        path: "/login",
        query: {
          redirect: from.path //
        }
      });
    })
    .catch(err => {
      // on cancel
      console.log(err);
    });
});

export default router;
