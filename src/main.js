import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const vuetify = createVuetify({
  components,
  directives,
})

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGizd_8i6SixXx0kYVa8ikkEbg02ZDsD0",
  authDomain: "uni-feedback-a439f.firebaseapp.com",
  projectId: "uni-feedback-a439f",
  storageBucket: "uni-feedback-a439f.appspot.com",
  messagingSenderId: "722368484877",
  appId: "1:722368484877:web:f363212ddd2f691be6e744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



createApp(App).use(router).mount('#app')
