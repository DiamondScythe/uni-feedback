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
            <th><router-link :to="{ name: 'details', params: { id: idea.id}}">Details</router-link></th>
        </tr>
    </table>
    {{ ideas }}
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
    }
}
</script>

<style>
table{
    border: 1px solid;
    width: 100%;
}
</style>