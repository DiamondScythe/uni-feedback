<template>
  <form @submit.prevent="handleSubmit">
    <br />

    <label>Post title </label>
    <input type="text" required v-model="title" />
    <br />

    <label>Post body </label>
    <input type="text" required v-model="body" />
    <br />

    <label for="category-select">Select a category:</label>
    <select id="category-select" v-model="selectedCategory">
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <input type="file" ref="fileInput" @change="handleFileUpload" />

    <button>Post</button>
  </form>
</template>

<script>
import axios from "axios";
import { checkAuthStatus } from "../utils/auth.js";

export default {
  data() {
    return {
      title: "",
      body: "",
      userId: 1,
      userEmail: "",
      categories: [],
      selectedCategory: "",
      file: null,
    };
  },
  async mounted() {
    const info = await checkAuthStatus();
    if (info.isAuthenticated) {
      //get user data here
      this.userEmail = info.user.email;
    }
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
    //get the sql user id based on email
    axios
      .get("http://localhost:8081/getStaffId?email=" + this.userEmail)
      .then((res) => {
        this.userId = res.data.id;
      });
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      //create form data
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("body", this.body);
      formData.append("user_id", this.userId);
      formData.append("category_id", this.selectedCategory);
      formData.append("file", this.file);

      axios
        .post("http://localhost:8081/ideas", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
