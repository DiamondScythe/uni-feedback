<template>
  <div class="formbold-main-wrapper">
  <!-- Author: FormBold Team -->
  <!-- Learn More: https://formbold.com -->
  <div class="formbold-form-wrapper">
    <h3>You can edit the closure date here</h3>
    <form @submit.prevent="checkTerms">
      <div class="formbold-mb-3 formbold-input-wrapp">
      </div>
      <div class="formbold-mb-3">
        <label  class="formbold-form-label"> Current idea closure date: </label>
        <div class="formbold-form-box"> {{ ideaClosure }} </div>
      </div>
      
      <div class="formbold-mb-3">
        <label  class="formbold-form-label"> Current final closure date: </label>
        <div class="formbold-form-box"> {{ finalClosure }} </div>
      </div>

      <div class="formbold-mb-3">
        <label for="datetime" class="formbold-form-label"> Select a date and time for idea closure:</label>
        <input class="formbold-form-box" type="datetime-local" id="datetime" v-model="selectedIdeaClosure" />
      </div>

      <div class="formbold-mb-3">
        <label for="datetime" class="formbold-form-label"> Select a date and time for final closure:</label>
        <input class="formbold-form-box" type="datetime-local" id="datetime" v-model="selectedFinalClosure" />      
      </div>

      <button class="formbold-btn" @click="updateClosure">Update</button>

    </form>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      closureDates: {},
      selectedIdeaClosure: null,
      selectedFinalClosure: null,
    };
  },
  computed: {
    ideaClosure() {
      const ideaDate = new Date(this.closureDates.idea_closure);
      return ideaDate.toLocaleString();
    },
    finalClosure() {
      const finalDate = new Date(this.closureDates.final_closure);
      return finalDate.toLocaleString();
    },
  },
  methods: {
    getClosure() {
      axios
        .get("http://localhost:8081/closureDates")
        .then((response) => {
          this.closureDates = response.data;
          this.selectedIdeaClosure = this.closureDates.idea_closure;
          this.selectedFinalClosure = this.closureDates.final_closure;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateClosure() {
      //if the selectedIdeaClosure is before the selectedFinalClosure, then the closure dates are updated.
      if (this.checkClosureDates()) {
        axios
          .post("http://localhost:8081/closureDates", {
            idea_closure: this.selectedIdeaClosure,
            final_closure: this.selectedFinalClosure,
          })
          .then((response) => {
            this.getClosure();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("The idea closure date must be before the final closure date.");
      }
    },
    //the below method checks whether the selectedIdeaClosure is before the selectedFinalClosure.
    //If it is, it returns true, otherwise it returns false.
    checkClosureDates() {
      if (
        new Date(this.selectedIdeaClosure) < new Date(this.selectedFinalClosure)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getClosure();
  },
};
</script>

<style>
.next-button {
        background-color: #1f2937;
        color: white;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        cursor: pointer;
        background-color: #30353b;
        opacity: 0.5;
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-size: 20px;
        
    }

        .next-button:hover {
        background-color: #1f2937;
        transition: background-color 0.3s ease;
        opacity: 1;
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

  .formbold-form-box {
    margin: auto;
    text-align: center;
    width: 80%;
    color: #07074D;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 10px;
    border: 1px black;
    border-width: 90%;
    border-style: solid;
    border-radius: 5px;
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
