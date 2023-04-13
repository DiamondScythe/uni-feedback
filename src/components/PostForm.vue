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
    };
  },
  mounted() {
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:8081/ideas", {
          title: this.title,
          body: this.body,
          user_id: this.user_id,
          category_id: this.selectedCategory,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
