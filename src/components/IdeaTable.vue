<template>
  <div v-if="isAuthenticated">
    Sorting:
    <select v-model="selectedSort">
      <option value="newestFirst">Sort Newest First</option>
      <option value="oldestFirst">Sort Oldest First</option>
      <option value="sortAlphabetically">Sort Alphabetically</option>
      <option value="sortAlphabeticallyReverse">
        Sort Reverse Alphabetically
      </option>
    </select>
    <table id="ideaTable">
      <tr>
        <th>idea</th>
        <th>type</th>
        <th>actions</th>
      </tr>
      <tr v-for="idea in paginatedItems" :key="idea.id">
        <th>{{ idea.title }}</th>
        <th>{{ getCategoryName(idea.category_id) }}</th>
        <th>
          <router-link :to="{ name: 'details', params: { id: idea.id } }"
            >Details</router-link
          >
          <button @click="confirmDelete(idea.id)" v-if="!isStaff">
            Delete
          </button>
        </th>
      </tr>
    </table>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
      Current page: {{ currentPage }}/{{ totalPages }}
    </div>
  </div>
  <div v-else>
    <h2>Please log in to view ideas</h2>
  </div>
</template>

<script>
import axios from "axios";
import { checkAuthStatus } from "../utils/auth.js";

export default {
  data() {
    return {
      isAuthenticated: false,
      isStaff: true,
      selectedSort: "newestFirst",

      ideas: [],
      categories: [],

      //pagination settings
      itemsPerPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sortedIdeas.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.ideas.length / this.itemsPerPage);
    },
    sortedIdeas() {
      return this.sortIdeas(this.ideas);
    },
  },
  async mounted() {
    axios.get("http://localhost:8081/ideas").then((res) => {
      this.ideas = res.data.ideas;
    }),
      axios.get("http://localhost:8081/categories").then((res) => {
        this.categories = res.data.categories;
      });

    //check user info first
    const info = await checkAuthStatus();
    if (info.isAuthenticated) {
      //get user data here
      this.isAuthenticated = true;
      //checks whether the user is staff or not
      if (info.user.role === "Staff") {
        this.isStaff = true;
      } else {
        this.isStaff = false;
      }
    }
  },
  methods: {
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.deleteItem(id);
      }
    },
    deleteItem(id) {
      axios
        .delete("http://localhost:8081/ideas?id=" + id)
        .then((res) => {
          console.log(res);

          return axios.get("http://localhost:8081/ideas");
        })
        .then((res) => {
          this.ideas = res.data.ideas;
        })
        .catch((err) => console.log(err));
    },

    //these are used for manipulating page count
    previousPage() {
      this.currentPage -= 1;
    },
    nextPage() {
      this.currentPage += 1;
    },

    //used to get the category name based on the category id
    getCategoryName(id) {
      const category = this.categories.find((category) => category.id === id);
      return category ? category.name : null; // return category name if found, null otherwise
    },

    //used to sort posts
    sortIdeas() {
      let sorted = [...this.ideas];
      if (this.selectedSort === "sortAlphabetically") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.selectedSort === "sortAlphabeticallyReverse") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
      } else if (this.selectedSort === "newestFirst") {
        sorted.sort((a, b) => {
          return new Date(b.uploaded_date) - new Date(a.uploaded_date);
        });
      } else if (this.selectedSort === "oldestFirst") {
        sorted.sort((a, b) => {
          return new Date(a.uploaded_date) - new Date(b.uploaded_date);
        });
      }
      return sorted;
    },
  },

  //watch for the sort selector change
  watch: {
    selectedSort() {
      this.sortIdeas();
    },
  },
};
</script>

<style>
table {
  border: 1px solid;
  width: 100%;
}
</style>
