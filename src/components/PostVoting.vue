<template>
  <body>
  <h5>Vote this idea:</h5>
  <button class= "upvote" @click="upvoteAction">Upvote</button>
  <button class= "neutralvote" @click="middleVoteAction">Neutral vote</button>
  <button class= "downvote" @click="downvoteAction">Downvote</button>
  <div>Total votes: {{ totalVotes }}</div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  props: ["idea_id", "user_id"],
  data() {
    return {
      totalVotes: 0,
    };
  },

  mounted() {
    this.getVotes();
  },

  methods: {
    upvoteAction() {
      axios
        .post("http://localhost:8081/voteIdea", {
          value: "1",
          user_id: this.user_id,
          idea_id: this.idea_id,
        })
        .catch((err) => console.log(err));
      this.getVotes();
    },
    downvoteAction() {
      axios
        .post("http://localhost:8081/voteIdea", {
          value: "-1",
          user_id: this.user_id,
          idea_id: this.idea_id,
        })
        .catch((err) => console.log(err));
      this.getVotes();
    },

    //this should fire when the user "unselects" a vote
    middleVoteAction() {
      axios
        .post("http://localhost:8081/voteIdea", {
          value: "0",
          user_id: this.user_id,
          idea_id: this.idea_id,
        })
        .catch((err) => console.log(err));
      this.getVotes();
    },

    getVotes() {
      axios
        .get("http://localhost:8081/ideavotes?id=" + this.idea_id)
        .then((res) => {
          console.log(res.data.votes);
          if (res.data.votes !== null) {
            this.totalVotes = res.data.votes;
          }
        });
    },
  },
};
</script>

<style scoped>
.upvote {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50; /* Green */
  margin: 5px;
  border-radius: 4px;
}

.neutralvote {
  background-color: white;
  color: black;
  border: 2px solid #0000FF; /* Green */
  margin: 5px;
  border-radius: 4px;
}

.downvote {
  background-color: white;
  color: black;
  border: 2px solid #EE4B2B; /* Green */
  margin: 5px;
  border-radius: 4px;
}
body{
    background:#F0FFFF;
    border: 3px black;
    border-radius: 15px;
    box-shadow: 10px 10px 5px lightblue;
}
</style>
