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
      <td>{{ getNumberOfIdeas(category.id) }}</td>
      <td>
        <button @click="confirmDelete(category.id)">Delete</button>
      </td>
    </tr>
  </table>
  <br />
  <form @submit.prevent="handleSubmit">
    <br />
    <label>Category name: </label>
    <input type="text" required v-model="name" />
    <button>Add</button>
  </form>
</template>

<script>
import axios from "axios";
import AddNewCategory from "./forms/AddNewCategory.vue";

export default {
  data() {
    return {
      ideas: [],
      categories: [],
      newCategory: "",
    };
  },
  components: {
    AddNewCategory,
  },
  mounted() {
    axios.get("http://localhost:8081/ideas").then((res) => {
      this.ideas = res.data.ideas;
    });
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:8081/categories", {
          name: this.name,
        })
        .then((res) => {
          return axios.get("http://localhost:8081/categories");
        })
        .then((res) => {
          this.categories = res.data.categories;
          this.name = "";
        })
        .catch((err) => console.log(err));
    },
    confirmDelete(id) {
      //checks if category has ideas
      if (this.getNumberOfIdeas(id) > 0) {
        alert("Cannot delete category with ideas");
        return;
      } else {
        if (confirm("Are you sure you want to delete this item?")) {
          this.deleteItem(id);
        }
      }
    },
    getNumberOfIdeas(category_id) {
      return this.ideas.filter((idea) => idea.category_id === category_id)
        .length;
    },
    deleteItem(id) {
      axios
        .delete("http://localhost:8081/categories?id=" + id)
        .then((res) => {
          console.log(res);
          return axios.get("http://localhost:8081/categories");
        })
        .then((res) => {
          this.categories = res.data.categories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
