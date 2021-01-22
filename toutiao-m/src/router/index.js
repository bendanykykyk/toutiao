import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const Login = () => import("views/login/Login");

const Layout = () => import("views/layout/Layout");
const Home = () => import("views/home/Home");
const Profile = () => import("views/profile/Profile");
const Qa = () => import("views/qa/Qa");
const Video = () => import("views/video/Video");

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
