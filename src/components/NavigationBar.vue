<template>
  <nav>
    <div class="flex-container">
      <div class="logo">
        <router-link to="/">University Feedback</router-link>
      </div>
      <div class="menu" style="max-width: max-content">
        <div class="menu-item">
          <router-link to="/signup" v-if="!isSignedIn">Sign Up </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/login" v-if="!isSignedIn">Login </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/admin" v-if="isSignedIn && isAdmin"
            >Admin Dashboard
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/" v-if="isSignedIn">Idea Table</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/post" v-if="isSignedIn">Post an idea </router-link>
        </div>
        <div class="menu-item">
          <a href="" @click.prevent="logout" v-if="isSignedIn">Logout </a>
        </div>
        <span v-if="isSignedIn"> Welcome {{ userEmail }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { checkAuthStatus } from "../utils/auth.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isSignedIn: false,
      userEmail: "",
      isAdmin: null,
    };
  },
  async created() {
    //checkAuthStatus returns a promise, so you have to use await to get the value.
    //You can't use the value of a promise directly.
    const info = await checkAuthStatus();
    if (info.isAuthenticated) {
      //get user data here
      this.isSignedIn = info.isAuthenticated;
      this.userEmail = info.user.email;
      //checks whether the user is an admin or not
      if (info.user.role === "Admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isSignedIn = false;
    }
  },
  mounted() {
    this.emitter.on("toggle-signedin", (isSignedIn) => {
      this.updateInfo();
    });
  },
  methods: {
    logout() {
      Cookies.remove("jwt");
      this.isSignedIn = false;
    },
    //the below method is used to update the info on the nav bar once the user has signed in
    async updateInfo() {
      const info = await checkAuthStatus();
      if (info.isAuthenticated) {
        //get user data here
        this.isSignedIn = info.isAuthenticated;
        this.userEmail = info.user.email;
        //checks whether the user is an admin or not
        if (info.user.role === "Admin") {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isSignedIn = false;
      }
    },
  },
};
</script>

<style scoped>
.flex-container {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
}
.flex-container div {
  height: fit-content;
  text-align: center;
  color: white;
  background-color: #1f2937;
}

.logo {
  width: 300px;
  height: 60px;
  height: fit-content;
  font-family: Monospace, "Lucida Console", sans-serif;
  font-weight: bold;
  font-size: 25px;
  padding-left: 30px;
}
.menu {
  width: auto;
  padding-right: 20px;
  font-family: Monospace, "Lucida Console", sans-serif;
  font-size: 18px;
}
.menu-item {
  padding: 8px;
  width: auto;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #ccc;
  empty-cells: hide;
  margin-left: 8px;
}
.menu-item:empty {
  display: none;
}
.menu a,
.logo a,
.menu router-link {
  text-decoration: none;
}
</style>
