<template>
  Signin
  <form @submit.prevent="login">
    <br />
    <label>Email </label>
    <input type="email" required v-model="email" />
    <br />
    <label>Password </label>
    <input type="password" required v-model="password" />
    <br />
    <br />
    <input type="submit" value="Log in" />
  </form>

  <button @click="logout">Log out</button>

  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "abc@gmail.com",
      password: "123456",
      role: "",
    };
  },
  methods: {
    login() {
      axios
        .post(
          "http://localhost:8081/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("login completed");
        })
        .catch((err) => console.log(err));
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

<style></style>
