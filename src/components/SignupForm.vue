<template>
  Signup
  <form @submit.prevent="handleSubmit" novalidate>
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
    <label>Role </label>
    <input type="text" required v-model="role" />
    <br />
    <input type="submit" value="Sign up" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "abc@gmail.com",
      password: "123456",
      role: "admin",
      signedIn: null,
      emailError: null,
      passwordError: null,
    };
  },
  methods: {
    handleSubmit() {
      this.resetErrors();
      axios
        .post(
          "http://localhost:8081/signup",
          {
            email: this.email,
            password: this.password,
            role: this.role,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("signup completed");
          this.toggleSignedIn();
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
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

<style></style>
