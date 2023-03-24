<template>
    <table id="ideaTable">
        <tr>
            <th>idea</th>
            <th>type</th>
            <th>actions</th>
        </tr>
        <tr v-for="idea in paginatedItems" :key="idea.id">
            <th>{{idea.title}}</th>
            <th>{{idea.category_id}}</th>
            <th><router-link :to="{ name: 'details', params: { id: idea.id}}">Details</router-link>
            <button @click="confirmDelete(idea.id)">Delete</button>
            </th>
        </tr>
    </table>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>
import axios from  'axios';

export default {
    data() {
      return {
        ideas: [],

        //pagination settings
        itemsPerPage: 4,
        currentPage: 1,
      }
    },
    computed: {
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.ideas.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.ideas.length / this.itemsPerPage);
        },
    },
    mounted(){
      axios.get("http://localhost:8081/ideas")
            .then(res => {
                this.ideas = res.data.ideas;
            }
            )
    },
    methods: {
        confirmDelete(id) {
            if (confirm('Are you sure you want to delete this item?')) {
            this.deleteItem(id)
            }
        },
        deleteItem(id) {
            axios.delete("http://localhost:8081/ideas?id="+id)
            .then(res => {
                console.log(res);

                return axios.get("http://localhost:8081/ideas")
            })
            .then(res => {
                this.ideas = res.data.ideas;
            })
            .catch(err => console.log(err))
        },

        //these are used for manipulating page count
        previousPage() {
        this.currentPage -= 1;
        },
        nextPage() {
        this.currentPage += 1;
        },
    }
}
</script>

<style>
table{
    border: 1px solid;
    width: 100%;
}
</style>