<template>
<body>
<div class="container"  >
    <h1> Post Your Idea</h1>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-20">
        <label for="title">Title:</label>
      </div>
      <div class="col-80">
        <input type="text" required v-model="title" placeholder="Title.." style="border:double 4px orange;">
      </div>
    </div>
    <div class="row">
      <div class="col-20">
        <label for="brief">Brief:</label>
      </div>
      <div class="col-80">
        <input type="text" required v-model="brief" placeholder="Brief.." style="border:double 4px orange;">
      </div>
    </div>
    <div class="row">
      <div class="col-20">
        <label for="category">Select a category:</label>
      </div>
      <div class="col-80" >
        <select id="category-select" v-model="selectedCategory" style="border:double 4px orange;">
          <option value="australia">Choose your category</option>
          <option value="usa">USA</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-20">
        <label for="Content">Content:</label>
      </div>
      <div class="col-80">
        <textarea type="text" required v-model="content" placeholder="Content.." style="height:150px;border:double 4px orange;"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-20">
        <label for="file_upload">Upload a File:</label>
      </div>
      <div class="col-80">
        <input type="file"  placeholder="Upload a file.." style="border:double 4px orange; width:100%">
      </div>
    </div>
    <div class="row">
        <div class ="col-80">
            <input id="checkbox" type="checkbox" />
            <label for="checkbox">I agree to these <a href="#">Terms and Conditions</a>.</label>
        </div>      
    </div>
    <div class="row">
      <button class="button" type="submit" value="Submit">Submit</button>
    </div>
  </form>
</div>

    <p>Title: {{ title }}</p>
    <p>Body: {{ body }}</p>
    <p>Type: {{ type }}</p>

</body>
</template>

<script>
import { file } from '@babel/types';
import axios from  'axios';

export default {
    beforeUpdate(){
        console.log("before Updated!")
    },
    data(){
        return{
            title: '',
            brief: '',
            content: '',
            user_id: '1',
            categories: [],
            selectedCategory: '',
            uploadedFile:'',
        }
    },
    mounted(){
        axios.get("http://localhost:8081/categories")
            .then(res => {
                this.categories = res.data.categories;
            }
            )
    },
    methods: {
        handleSubmit(){
            axios.post('http://localhost:8081/idea',{
                title: this.title,
                brief: this.brief,
                body: this.body,
                user_id: this.user_id,
                category_id: this.selectedCategory,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
h1{
    font-size: 32px;
    font-weight: 500;
    font-family: "Game-of-Thrones";
    line-height: 42px;
    color:  #331C0E;
    text-align: center;
}
/* Style inputs, select elements and textareas */
input[type=text], select, textarea{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color:  #331C0E;
  
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  color:  #FFF190;
  font-family: "Game-of-Thrones";
  font-size: 14px;

}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: brown;
  opacity: 0.6
  ; /* Firefox */
}

/* Style the submit button */
input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
/*add background immage */
body{
    background-image: url('../assets/images/postform-background.jpg');
    
}   
/* Style the container */
.container {
    border-radius: 5px;
    background-color: rgba(255,255,255,0.13);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    top: 50%;
    left: 50%;
    margin: 0 auto; 
    text-align: center;
    box-shadow: 0 0 40px rgba(8,6,15,0.6);
    padding: 20px;
    
}

/* Floating column for labels: 25% width */
.col-20 {
  float: left;
  width: 20%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-80 {
  float: left;
  width: 80%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  width: 200px;
  margin: 0 auto;
}


/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>