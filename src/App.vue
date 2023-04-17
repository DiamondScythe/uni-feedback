<template>
  <NavigationBar />
  <router-view />
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      isSignedIn: false,
      userEmail: "",
    };
  },
  methods: {},
  beforeMount() {},
};
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

@font-face {
  font-family: "Game-of-Thrones";
  src:local("Game-of-Thrones"),url(./fonts/Game-of-Thrones.ttf) format("truetype");
}
</style>
