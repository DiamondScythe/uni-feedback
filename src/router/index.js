import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PostView from "../views/PostView.vue";
import DetailsView from "../views/DetailsView.vue";
import SignupView from "../views/SignupView.vue";
import AdminView from "../views/AdminDashboard.vue";
import TermsView from "../views/TermsView.vue";

import { getJwtToken } from "@/utils/auth";
import { checkAuthStatus } from "@/utils/auth";
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
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const info = await checkAuthStatus();
  let isAuthenticated = false;
  let role = "";

  if (info) {
    isAuthenticated = info.isAuthenticated;
    role = info.user.role;
  }

  if (requiresAuth) {
    if (isAuthenticated) {
      if (requiresAdmin) {
        if (role === "Admin") {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
