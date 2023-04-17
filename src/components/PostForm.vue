<template>
  <form class="form-container" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title">Idea title:</label>
      <input type="text" required v-model="title" id="title" />
    </div>

    <div class="form-group">
      <label for="body">Idea description:</label>
      <textarea required v-model="body" id="body"></textarea>
    </div>

    <div class="form-group">
      <label for="category-select">Select a category:</label>
      <select id="category-select" v-model="selectedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="file-input">Upload an image:</label>
      <input type="file" id="file-input" ref="fileInput" @change="handleFileUpload" accept=".jpg,.jpeg,.png" />
    </div>

    <button class="btn btn-primary" type="submit">Post</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      body: "",
      user_id: "1",
      categories: [],
      selectedCategory: "",
      file: null,
    };
  },
  mounted() {
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    handleSubmit() {
      //create form data
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("body", this.body);
      formData.append("user_id", this.user_id);
      formData.append("category_id", this.selectedCategory);
      formData.append("file", this.file);

      axios
        .post("http://localhost:8081/ideas", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>

.form-container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-size: 20px;
}

.form-group {
  margin-bottom: 1rem;
  
}

label {
  
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  
}

input[type="text"],
textarea,
select {
  width: 80%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: auto;
  margin-right: auto;
  
}

input[type="file"] {
  display: block;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc; 
  font-family: Monospace, 'Lucida Console', sans-serif;
  font-size: 20px;
}

button[type="submit"] {
  display: block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #1F2937;
  width: 120px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
}

button[type="submit"]:hover {
  background-color: #0069d9;
  font-family: Monospace, 'Lucida Console', sans-serif;
  margin-left: auto;
  margin-right: auto;

}

</style>
