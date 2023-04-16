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

  <button @click="updateClosure">Update</button>
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
    },
  },
  mounted() {
    this.getClosure();
  },
};
</script>
