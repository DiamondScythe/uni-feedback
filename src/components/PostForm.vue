<template>
  <div class="formbold-main-wrapper">
  <!-- Author: FormBold Team -->
  <!-- Learn More: https://formbold.com -->
  <div class="formbold-form-wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="formbold-mb-3 formbold-input-wrapp">
      </div>
      <div class="formbold-mb-3">
        <label for="age" class="formbold-form-label"> Idea Title: </label>
        <input
        placeholder="idea name..."
        type="text" required v-model="title"
          class="formbold-form-input"
        />
      </div>
      <div class="formbold-mb-3">
        <label class="formbold-form-label">Choose Category:</label>

        <select class="formbold-form-input" id="category-select" v-model="selectedCategory" style="color: black">
          <option class="formbold-form-input"
            v-for="category in categories"
            :key="category.id"
            :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <!-- <select class="formbold-form-input" name="occupation" id="occupation">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select> -->
      </div>

      <div class="formbold-mb-3">
        <label for="message" class="formbold-form-label">
          Idea Description
        </label>
        <textarea
          rows="6"
          placeholder="idea description..."
          type="text" required v-model="body"
          class="formbold-form-input"
        ></textarea>
      </div>

      <div class=" formbold-mb-3">
        <label for="upload" class="formbold-form-label">
          Upload Your File:
        </label>
        <input
        type="file" ref="fileInput" @change="handleFileUpload"
          class="formbold-form-file formbold-mb-3"
        />
      </div>
      <div class=" formbold-mb-3">
            <input id="checkbox" type="checkbox" required/>
            <label for="checkbox">I agree to these <router-link to="/terms" target="_blank">terms and conditions</router-link>.</label>
        </div>  
      <button class="formbold-btn">Post your idea</button>
    </form>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { checkAuthStatus } from "../utils/auth.js";

export default {
  data() {
    return {
      title: "",
      body: "",
      userId: 1,
      userEmail: "",
      categories: [],
      selectedCategory: "",
      file: null,
    };
  },
  async mounted() {
    const info = await checkAuthStatus();
    if (info.isAuthenticated) {
      //get user data here
      this.userEmail = info.user.email;
    }
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
    //get the sql user id based on email
    axios
      .get("http://localhost:8081/getStaffId?email=" + this.userEmail)
      .then((res) => {
        this.userId = res.data.id;
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
      formData.append("user_id", this.userId);
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
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
  .formbold-mb-3 {
    margin-bottom: 5px;
  }
  .formbold-main-wrapper {
    display: flex;
    max-height: 650px;
  }
  .formbold-form-wrapper {
    margin: 0 auto;
    max-width: 570px;
    width: 100%;
    background:#F0FFFF;
    border: 3px black;
    border-radius: 15px;
    box-shadow: 10px 10px 5px lightblue;
  }
  .formbold-img {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  .formbold-input-wrapp > div {
    display: flex;
    gap: 20px;
  }
  .formbold-input-flex {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  .formbold-input-flex > div {
    width: 50%;
  }
  .formbold-form-input {
    width: 90%;
    padding: 13px 22px;
    border-radius: 5px;
    border: 1px solid #dde3ec;
    background: #ffffff;
    font-weight: 500;
    font-size: 16px;
    color: black;
    outline: none;
    resize: none;
  }
  .formbold-form-input::placeholder,
  select.formbold-form-input,
  .formbold-form-input[type='date']::-webkit-datetime-edit-text,
  .formbold-form-input[type='date']::-webkit-datetime-edit-month-field,
  .formbold-form-input[type='date']::-webkit-datetime-edit-day-field,
  .formbold-form-input[type='date']::-webkit-datetime-edit-year-field {
    color: rgba(83, 99, 135, 0.5);
  }
  .formbold-form-input:focus {
    border-color: #6a64f1;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
  .formbold-form-label {
    color: #07074D;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
    
  }
  .formbold-form-file-flex {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .formbold-form-file-flex .formbold-form-label {
    margin-bottom: 0;
  }
  .formbold-form-file {
    font-size: 14px;
    line-height: 24px;
    color: #536387;
  }
  .formbold-form-file::-webkit-file-upload-button {
    display: none;
  }
  .formbold-form-file:before {
    content: 'Upload file';
    display: inline-block;
    background: #EEEEEE;
    border: 0.5px solid #FBFBFB;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 3px 12px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    color: #637381;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    margin-right: 10px;
  }
  .formbold-btn {
    text-align: center;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 14px 25px;
    border: none;
    font-weight: 500;
    background-color: #6a64f1;
    color: white;
    cursor: pointer;
    margin-top: 25px;
  }
  .formbold-btn:hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
  }
  .formbold-w-45 {
    width: 45%;
  }
</style>
