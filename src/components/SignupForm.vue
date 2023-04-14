<template>
  Signup
  <form @submit.prevent="handleSubmit">
    <br />
    <label>Email </label>
    <input type="email" required v-model="email" />
    <br />
    <label>Password </label>
    <input type="password" required v-model="password" />
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
    };
  },
  methods: {
    handleSubmit() {
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
