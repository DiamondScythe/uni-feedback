<template>
    <div class="sorting">
     Sorting:
     <select v-model="selectedSort">
     <option value="default">Default</option>
     <option value="sortAlphabetically">Sort Alphabetically</option>
     <option value="sortAlphabeticallyReverse">
      Sort Reverse Alphabetically
    </option>
  </select>
    </div>
    <div class="idea-table">
        <table>
            <thead>
                <tr>
                    <th>Idea</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="idea in paginatedItems" :key="idea.id">
                    <td>{{ idea.title }}</td>
                    <td>{{ getCategoryName(idea.category_id) }}</td>
                    <td>
                        <router-link class="details-link" :to="{ name: 'details', params: { id: idea.id } }">Details</router-link>
                        <button class="delete-button" @click="confirmDelete(idea.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button class="prev-button"
                    :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)">
                Prev
            </button>
            <div class="page-numbers">
                <span v-for="page in pages"
                      :key="page"
                      class="page-number"
                      :class="{ active: currentPage === page }"
                      @click="changePage(page)">
                    {{ page }}
                </span>
            </div>
            <button class="next-button"
                    :disabled="currentPage === totalPages"
                    @click="changePage(currentPage + 1)">
                Next
            </button>

        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                selectedSort: "default",

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
        mounted() {
            axios.get("http://localhost:8081/ideas").then((res) => {
                this.ideas = res.data.ideas;
            }),
                axios.get("http://localhost:8081/categories").then((res) => {
                    this.categories = res.data.categories;
                });
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
                } else if (this.selectedSort === "default") {
                    sorted.sort((a, b) => a.id - b.id);
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
    .sorting {
        padding: 20px;
        align-items: center;
        height: auto;
        font-size: 20px;
        margin-left: 150px;
        margin-right: 150px;
        font-family: Monospace, 'Lucida Console', sans-serif;
    }
    .idea-table {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        font-size: 20px;
        margin-left: 150px;
        margin-right: 150px;
        font-family: Monospace, 'Lucida Console', sans-serif;

        
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
        border: 2px solid #ddd;
                font-family: Monospace, 'Lucida Console', sans-serif;

    }

    th,
    td {
        padding: 0.5rem;
        text-align: center;
        border: 2px solid #ddd;

    }

    th {
        font-weight: bold;
        
    }

    .details-link {
        margin-right: 1rem;
    }

    .delete-button {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

        .delete-button:hover {
            background-color: #c82333;
        }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .prev-button,
    .next-button {
        background-color: #1f2937;
        color: white;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;

        cursor: pointer;
        transition: background-color 0.3s ease;
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-size: 20px;

    }

        .prev-button[disabled],
        .next-button[disabled] {
            opacity: 0.5;
            cursor: default;
        }

        .prev-button:hover,
        .next-button:hover {
            background-color: #1f2937;
        }
</style>

