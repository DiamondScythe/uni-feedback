
<template>
  <NavigationBar :isSignedIn="isSignedIn" :userEmail="userEmail"/>
  <router-view/>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    NavigationBar
  },
  data(){
    return{
      isSignedIn: true,
      userEmail: ''
    }
  },
  methods: {
    attachListener(){
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          this.userEmail = user.email;
          console.log(uid);
          console.log('currently signed in');
          this.isSignedIn = true
          // ...
        } else {
          console.log('currently signed out');
          this.isSignedIn = false
        }
      });
    }

  },

  beforeMount() {
    this.attachListener()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #28cd83;
}
</style>
