<template>

  <form class="comment-form" @submit.prevent="handleSubmit">
      <h3>Leave a comment</h3>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" name="comment" required v-model="commentText" placeholder="Your thoughts.."></textarea>
      </div>
      <button type="submit">Post Comment</button>
  </form>
  
  <h2>Comments:</h2>
  <div class="comment-section" v-if="comments.length > 0">
    <li v-for="comment in comments" :key="comment.id">
    <div class="comment" >
        <div class="comment-body" >
        <h4>Anonymous:</h4>
        <h3> {{ comment.text }} </h3>
        <span class="comment-date">April 16, 2023</span>
      </div>
    </div>
    </li>  
  </div>
  <div v-else>No Comments Yet</div>
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

<style scoped>
.comment-section {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.comment {
  margin-bottom: 20px;
}

.comment img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-body {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  align-content: left;
}

.comment-body h4 {
  margin-top: 0;
}

.comment-date {
  display: block;
  font-style: italic;
  font-size: 14px;
  margin-top: 5px;
}

.comment-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-left: 15%;
  margin-right: 15%;
}

.comment-form h3 {
  margin-top: 0px;
}

.form-group {
  margin-bottom: 10px;
  margin-right: 20px;
  border: 3px black;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 0 0 5px #ccc;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}
</style>