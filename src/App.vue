<template>
  <div id="app">
    <NavigationBar />
    <div class="content">
      <router-view />
    </div>
    <Footer v-if="!$route.meta.hideFooter" />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    NavigationBar,
    Footer,
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content {
  flex-grow: 1;
}
body {
  margin: 0 auto;
}
nav a {
  font-weight: bold;
  color: #ffffff;
}
nav a.router-link-exact-active {
  color: #28cd83;
}
.Footer {
  margin-top: auto;
}

@font-face {
  font-family: "Game-of-Thrones";
  src: local("Game-of-Thrones"),
    url(./fonts/Game-of-Thrones.ttf) format("truetype");
}
</style>
