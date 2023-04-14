<template>
  <div>
    <h1>Comments:</h1>
    <div v-if="comments.length > 0">
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.text }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No comments yet.</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <label>Add a comment:</label>
      <input type="text" v-model="commentText" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["idea_id"],
  data() {
    return {
      commentText: "",
      comments: [],
    };
  },
  mounted() {
    if (this.idea_id > 0) {
      axios
        .get("http://localhost:8081/comments?ideaId=" + this.idea_id)
        .then((res) => {
          this.comments = res.data;
        });
    } else {
      console.log(this.idea_id);
    }
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:8081/comments", {
          text: this.commentText,
          date_time: "today",
          user_id: 1,
          idea_id: this.idea_id,
        })
        .then((res) => {
          return axios.get(
            "http://localhost:8081/comments?ideaId=" + this.idea_id
          );
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
