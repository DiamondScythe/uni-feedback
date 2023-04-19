<template>
  <body>
    <h5>Vote this idea:</h5>
    <button class="upvote" @click="upvoteAction">Upvote</button>
    <button class="neutralvote" @click="middleVoteAction">Neutral vote</button>
    <button class="downvote" @click="downvoteAction">Downvote</button>
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
        .then((res) => (this.totalVotes = res.data.votes))
        .catch((err) => console.log(err));
    },
    downvoteAction() {
      axios
        .post("http://localhost:8081/voteIdea", {
          value: "-1",
          user_id: this.user_id,
          idea_id: this.idea_id,
        })
        .then((res) => (this.totalVotes = res.data.votes))
        .catch((err) => console.log(err));
    },

    //this should fire when the user "unselects" a vote
    middleVoteAction() {
      axios
        .post("http://localhost:8081/voteIdea", {
          value: "0",
          user_id: this.user_id,
          idea_id: this.idea_id,
        })
        .then((res) => (this.totalVotes = res.data.votes))
        .catch((err) => console.log(err));
    },

    getVotes() {},
  },
};
</script>

<style scoped>
.upvote {
  background-color: white;
  color: black;
  border: 2px solid #4caf50; /* Green */
  margin: 5px;
  border-radius: 4px;
}

.neutralvote {
  background-color: white;
  color: black;
  border: 2px solid #0000ff; /* Green */
  margin: 5px;
  border-radius: 4px;
}

.downvote {
  background-color: white;
  color: black;
  border: 2px solid #ee4b2b; /* Green */
  margin: 5px;
  border-radius: 4px;
}
body {
  background: #f0ffff;
  border: 3px black;
  border-radius: 15px;
  box-shadow: 10px 10px 5px lightblue;
}
</style>
