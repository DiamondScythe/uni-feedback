<template>
  <form @submit.prevent="login">
    <br />
    <label>Email </label>
    <input type="email" required v-model="email" />
    <br />
    <span class="error">{{ emailError }}</span>
    <br />
    <label>Password </label>
    <input type="password" required v-model="password" />
    <br />
    <span class="error">{{ passwordError }}</span>
    <br />
    <input type="submit" value="Log in" />
  </form>
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
      emailError: null,
      passwordError: null,
    };
  },
  methods: {
    login() {
      this.resetErrors();
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
        .catch((err) => {
          console.log(err.response.data.errors.email);
          this.emailError = err.response.data.errors.email;
          this.passwordError = err.response.data.errors.password;
        });
    },
    toggleSignedIn() {
      this.signedIn = true;
      this.emitter.emit("toggle-signedin", this.signedIn);
    },
    resetErrors() {
      this.emailError = null;
      this.passwordError = null;
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
