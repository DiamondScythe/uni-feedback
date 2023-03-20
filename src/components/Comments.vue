<template>
    <h1>Add comment to idea page</h1>
    <form @submit.prevent="handleSubmit">
        <label>Comment something:</label>
        <input type="text" required v-model="commentText">
        <br>
        <button>Post</button>
    </form>

    <h1>Comments:</h1>
    <div>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>
    </div>

</template>

<script>
import axios from  'axios';

export default{
    props: ['idea_id'],
    data(){
        return{
            commentText: '',
            comments: [],
        }
    },
    mounted(){
        if (this.idea_id > 0 ){
            console.log("ideaid isn't null, idea id is:"+this.idea_id)
            axios.get("http://localhost:8081/comments?ideaId="+this.idea_id)
            .then(res => {
                this.comments = res.data;
            })
        }
        else{
            console.log(this.idea_id)
        }
    },
    methods: {
        handleSubmit(){
            axios.post('http://localhost:8081/comments', {
                text: this.commentText,
                date_time: 'today',
                user_id: 1,
                idea_id: this.idea_id,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
    }
}
</script>

<style>

</style>