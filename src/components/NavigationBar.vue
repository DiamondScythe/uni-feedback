<template>
  <nav>
    <div class="flex-container">
      <div class="logo">
        <router-link to="/">University Feedback</router-link>
      </div>
      <div class="menu">
        <router-link to="/signup" v-if="!isSignedIn">Sign Up </router-link>
        <router-link to="/login" v-if="!isSignedIn">Login </router-link>
        <a href="" @click.prevent="logout" v-if="isSignedIn">Logout </a>
        <router-link to="/post">Post an idea</router-link>
        <span v-if="isSignedIn">Welcome {{ userEmail }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  props: ["isSignedIn", "userEmail"],
  methods: {
    handleLogout() {
      console.log("Logout");
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error.message);
        });
    },
  },
};
</script>

<style>
.flex-container {
  height: 50px;
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
  width: 200px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: bold;
  padding-left: 30px;
}

.menu {
  width: 300px;
  padding-right: 30px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
</style>
