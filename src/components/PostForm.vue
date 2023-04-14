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

export default {
  data() {
    return {
      title: "",
      body: "",
      user_id: "1",
      categories: [],
      selectedCategory: "",
      file: null,
    };
  },
  mounted() {
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
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
      formData.append("user_id", this.user_id);
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
