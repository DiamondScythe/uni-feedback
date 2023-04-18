<template>
  You can edit the closure date here
  <br />
  <br />Current idea closure date:
  {{ ideaClosure }}
  <br />Current final closure date:
  {{ finalClosure }}
  <br />
  <div>
    <label for="datetime">Select a date and time for idea closure:</label>
    <input type="datetime-local" id="datetime" v-model="selectedIdeaClosure" />
  </div>
  <div>
    <label for="datetime">Select a date and time for final closure:</label>
    <input type="datetime-local" id="datetime" v-model="selectedFinalClosure" />
  </div>

  <button class="next-button" @click="updateClosure">Update</button>
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
        </style>
