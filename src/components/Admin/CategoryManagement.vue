<template>
  Current categories:
  <br />
  <table id="categoryTable">
    <tr>
      <th>Category</th>
      <th>Number of ideas</th>
      <th>Actions</th>
    </tr>
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.name }}</td>
      <td>15</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  </table>
  <br />
  <button>Add new category</button>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      newCategory: "",
    };
  },
  mounted() {
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
};
</script>
