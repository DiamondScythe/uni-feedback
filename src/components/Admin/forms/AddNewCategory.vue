<template>
 <div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="formbold-mb-3">
        <label for="age" class="formbold-form-label"> New Category: </label>
        <input
        type="text" required v-model="name" 
        class="formbold-form-input"
        />
      </div>
      <button class="formbold-btn">Create</button>
    </form>
  </div>
</div>
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
