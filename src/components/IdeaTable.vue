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
        <td>{{ idea.title }}</td>
        <td>{{ getCategoryName(idea.category_id) }}</td>
        <td>
          <router-link :to="{ name: 'details', params: { id: idea.id } }"
            >Details</router-link
          >
          <button @click="confirmDelete(idea.id)" v-if="!isStaff">
            Delete
          </button>
        </td>
      </tr>
    </table>

    <div class="pagination" style="margin-top: 5px;">
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

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Roboto');
*{
 margin: auto;
 padding: 0;
 outline: 0;
}

.filter{
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 z-index: 1;
 background: rgb(233,76,161);
background: -moz-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: -webkit-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e94ca1",endColorstr="#c74ae9",GradientType=1);
opacity: .7;
}
table{
margin: 0px auto;
 z-index: 2;
 left: 50%;
 top: 50%;
 width: 80%; 
 border-spacing: 0;
 box-shadow: 0 2px 15px rgba(64,64,64,.7);
 border-radius: 12px 12px 0 0;
 overflow: hidden;

}
td , th{
 padding: 15px 20px;
 text-align: center;
 

}
th{
 background-color: #ba68c8;
 color: #fafafa;
 font-family: 'Open Sans',Sans-serif;
 font-weight: 200;
 text-transform: uppercase;

}
tr{
 width: 100%;
 background-color: #fafafa;
 font-family: 'Montserrat', sans-serif;
}
tr:nth-child(even){
 background-color: #eeeeee;
}
</style>
