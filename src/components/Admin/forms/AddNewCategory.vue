<template>
  <form @submit.prevent="handleSubmit">
    <br />
    <label>Category name: </label>
    <input type="text" required v-model="name" />
    <button>Add</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:8081/categories", {
          name: this.name,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
