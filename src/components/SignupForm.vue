<template>
  <body>
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <h3>Please Sign Up Here</h3>
      <label for="email">Email</label>
      <input type="email" required v-model="email" />
      <span class="error">{{ emailError }}</span>
      <label for="password">Password</label>
      <input type="password" required v-model="password" />
      <label for="role">Role:</label>
      <select class="select-list" required v-model="role">
        <option class="select-list" value="Admin">Admin</option>
        <option class="select-list" value="Manager">Manager</option>
        <option selected class="select-list" value="Staff">Staff</option>
      </select>
      <span class="error">{{ passwordError }}</span>
      <button type="submit" value="Sign Up">Sign Up</button>
    </form>
  </body>
  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Role: {{ role }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      role: "Staff",
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
          axios.post("http://localhost:8081/addUserInfo", {
            email: this.email,
            role: this.role,
          });
        })
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

<style scoped media="screen">
.error {
  color: red;
}
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: white;
}
.select-list {
  display: block;
  height: 50px;
  width: 100%;
  background-color: #fcfef0;
  color: #331c0e;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #331c0e;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 230px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}
form {
  height: 500px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 45px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  font-family: "Game-of-Thrones";
  line-height: 42px;
  color: #331c0e;
  text-align: center;
}
label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  color: #67331e;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: #fcfef0;
  color: #331c0e;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid #331c0e;
}
::placeholder {
  color: #331c0e;
}
button {
  margin-top: 30px;
  width: 100%;
  background-color: #00ccff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}
</style>
