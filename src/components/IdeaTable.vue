<template>
    <table id="ideaTable">
        <tr>
            <th>id</th>
            <th>idea</th>
            <th>type</th>
            <th>actions</th>
        </tr>
        <tr v-for="idea in ideas">
            <th>{{idea.id}}</th>
            <th>{{idea.title}}</th>
            <th>{{idea.category_id}}</th>
            <th><router-link :to="{ name: 'details', params: { id: idea.id}}">Details</router-link>
            <button @click="confirmDelete(idea.id)">Delete</button>
            </th>
        </tr>
    </table>
</template>

<script>
import axios from  'axios';

export default {
    data() {
      return {
        ideas: [],
      }
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
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }
}
</script>

<style>
table{
    border: 1px solid;
    width: 100%;
}
</style>