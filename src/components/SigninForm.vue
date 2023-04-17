<template>
  <body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form @submit.prevent="login" >
        <h3>Please  Login  Here</h3>
        <label for="username">Username</label>
        <input type="email" required v-model="email" placeholder="Email" id="username">
        <span class="error">{{ emailError }}</span>
        <label for="password">Password</label>
        <input type="password" required v-model="password" placeholder="Password" id="password">
        <span class="error">{{ passwordError }}</span>
        <button type="submit" value="Log in">Log In</button>
        <router-link to="/signup" v-if="!isSignedIn"> <button>Sign Up here</button> </router-link>
    </form>

</body>
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

<style scoped media="screen">
.error {
  color: red;
}
      *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color:white;
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 230px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
    form {
        height: 550px;
        width: 400px;
        background-color: rgba(255,255,255,0.13);
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 0 40px rgba(8,7,16,0.6);
        padding: 50px 35px;
    }
        form * {
            font-family: 'Poppins',sans-serif;
            color: #ffffff;
            letter-spacing:2.5px;
            outline: none;
            border: none;
            font-family: Monospace, 'Lucida Console', sans-serif;
            font-weight: bold;
            font-size: 60px;
        }
        form h3 {
            font-size: 32px;
            font-weight: 500;
            font-family: "Game-of-Thrones";
            line-height: 42px;
            color: #331C0E;
            text-align: center;
            font-family: Monospace, 'Lucida Console', sans-serif;
            font-weight: bold;
            font-size: 45px;
        }
label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    color:#67331E;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color:  #FCFEF0;
    color: #331C0E;
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: 1px solid #331C0E;
}
::placeholder{
    color: #331C0E;
}
button{
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
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}

</style>
