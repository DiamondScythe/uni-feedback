<template>
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
      signedIn: null,
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
          this.toggleSignedIn();
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    toggleSignedIn() {
      this.signedIn = true;
      this.emitter.emit("toggle-signedin", this.signedIn);
    },
  },
};
</script>

<style></style>
