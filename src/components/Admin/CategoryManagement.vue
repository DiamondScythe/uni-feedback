<template>
  <h3>Current categories:</h3>
  <br />
  <table id="categoryTable">
    <tr>
      <th>Category</th>
      <th>Number of ideas</th>
      <th>Actions</th>
    </tr>
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.name }}</td>
      <td>{{ getNumberOfIdeas(category.id) }}</td>
      <td>
        <button @click="confirmDelete(category.id)">Delete</button>
      </td>
    </tr>
  </table>
  <br/>

  <h3>Or you can add new category:</h3>
  <div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form @submit.prevent="handleSubmit">
      <div class="formbold-mb-3">
        <label for="age" class="formbold-form-label"> <h5>New Category:</h5> </label>
        <input
        placeholder="New category..."
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
import AddNewCategory from "./forms/AddNewCategory.vue";

export default {
  data() {
    return {
      ideas: [],
      categories: [],
      newCategory: "",
    };
  },
  components: {
    AddNewCategory,
  },
  mounted() {
    axios.get("http://localhost:8081/ideas").then((res) => {
      this.ideas = res.data.ideas;
    });
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
  methods: {
    handleSubmit() {
      axios
        .post("http://localhost:8081/categories", {
          name: this.name,
        })
        .then((res) => {
          return axios.get("http://localhost:8081/categories");
        })
        .then((res) => {
          this.categories = res.data.categories;
          this.name = "";
        })
        .catch((err) => console.log(err));
    },
    confirmDelete(id) {
      //checks if category has ideas
      if (this.getNumberOfIdeas(id) > 0) {
        alert("Cannot delete category with ideas");
        return;
      } else {
        if (confirm("Are you sure you want to delete this item?")) {
          this.deleteItem(id);
        }
      }
    },
    getNumberOfIdeas(category_id) {
      return this.ideas.filter((idea) => idea.category_id === category_id)
        .length;
    },
    deleteItem(id) {
      axios
        .delete("http://localhost:8081/categories?id=" + id)
        .then((res) => {
          console.log(res);
          return axios.get("http://localhost:8081/categories");
        })
        .then((res) => {
          this.categories = res.data.categories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
  h3 {
  font-size: 25px;
  font-weight: 500;
  font-family: "Game-of-Thrones";
  line-height: 42px;
  color: #331c0e;
  text-align: center;
 }
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
    margin-top:10px;
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

  /* Table styling here: */
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Roboto');
*{
 margin: auto;
 padding: 0;
 outline: 0;
}

.filter{
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 z-index: 1;
 background: rgb(233,76,161);
background: -moz-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: -webkit-linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
background: linear-gradient(90deg, rgba(233,76,161,1) 0%, rgba(199,74,233,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e94ca1",endColorstr="#c74ae9",GradientType=1);
opacity: .7;
}
table{
margin: 0px auto;
 z-index: 2;
 left: 50%;
 top: 50%;
 width: 80%; 
 border-spacing: 0;
 box-shadow: 0 2px 15px rgba(64,64,64,.7);
 border-radius: 12px 12px 0 0;
 overflow: hidden;

}
td , th{
 padding: 15px 20px;
 text-align: center;
 

}
th{
 background-color: #ba68c8;
 color: #fafafa;
 font-family: 'Open Sans',Sans-serif;
 font-weight: 200;
 text-transform: uppercase;

}
tr{
 width: 100%;
 background-color: #fafafa;
 font-family: 'Montserrat', sans-serif;
}
tr:nth-child(even){
 background-color: #eeeeee;
}

</style>
