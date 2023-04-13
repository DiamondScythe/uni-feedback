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
  <AddNewCategory></AddNewCategory>
</template>

<script>
import axios from "axios";
import AddNewCategory from "./forms/AddNewCategory.vue";

export default {
  data() {
    return {
      categories: [],
      newCategory: "",
    };
  },
  components: {
    AddNewCategory,
  },
  mounted() {
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
};
</script>
