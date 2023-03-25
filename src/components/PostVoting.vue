<template>
<button @click="upvoteAction">
    Upvote
</button>
<button @click="middleVoteAction">
    Neutral vote
</button>
<button @click="downvoteAction">
    Downvote
</button>
Total votes: {{ totalVotes }}
</template>

<script>
import axios from 'axios';

export default {
    props: ['idea_id', 'user_id'],
    data() {
        return{
            totalVotes: 0,
        }
    },
    
    mounted() {
        this.getVotes()
    },

    methods: {
        upvoteAction(){
            axios.post('http://localhost:8081/voteIdea', {
                value: '1',
                user_id: this.user_id,
                idea_id: this.idea_id,
            })
            .catch(err => console.log(err));
            this.getVotes()
        },
        downvoteAction(){
            axios.post('http://localhost:8081/voteIdea', {
                value: '-1',
                user_id: this.user_id,
                idea_id: this.idea_id,
            })
            .catch(err => console.log(err));
            this.getVotes()
        },

        //this should fire when the user "unselects" a vote
        middleVoteAction(){
            axios.post('http://localhost:8081/voteIdea', {
                value: '0',
                user_id: this.user_id,
                idea_id: this.idea_id,
            })
            .catch(err => console.log(err));
            this.getVotes()
        },

        getVotes(){
            axios.get("http://localhost:8081/ideavotes?id="+this.idea_id)
            .then(res => {
                if (res.data.votes !== null){
                    this.totalVotes = res.data.votes;
                }
            }
            )
        }
    }
}
</script>

<style>

</style>