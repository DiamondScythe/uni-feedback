import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PostView from "../views/PostView.vue";
import DetailsView from "../views/DetailsView.vue";
import SignupView from "../views/SignupView.vue";
import AdminView from "../views/AdminDashboard.vue";

import { getJwtToken } from "@/utils/auth";
import axios from "axios";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/post",
    name: "post",
    component: PostView,
  },
  {
    path: "/details/:id",
    name: "details",
    component: DetailsView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = getJwtToken();

  if (requiresAuth) {
    if (token) {
      axios
        .get("http://localhost:8081/userAuth", {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"), // get JWT token from browser's cookies
          },
        })
        .then((response) => {
          if (response.data.isAuthenticated) {
            console.log("User info:", response.data.user);
            next();
          } else {
            next("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          next("/login");
        });
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
