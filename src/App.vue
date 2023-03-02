
<template>
  <NavigationBar/>
  <router-view/>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    NavigationBar
  },
  methods: {
    attachListener(){
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          console.log('currently signed in');
          // ...
        } else {
          // User is signed out
          // ...
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
