import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

createApp(App).use(router).mount('#app')
