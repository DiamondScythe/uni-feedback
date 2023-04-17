<template>
  <div>
    Here is the pie chart that illustrates the number of ideas in each category:
  </div>
  <canvas id="pie-chart"></canvas>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      ideas: [],
      categories: [],
    };
  },

  mounted() {
    axios.get("http://localhost:8081/ideas").then((res) => {
      this.ideas = res.data.ideas;
      this.createChart();
    });
    axios.get("http://localhost:8081/categories").then((res) => {
      this.categories = res.data.categories;
      this.createChart();
    });
  },

  methods: {
    createChart() {
      if (this.ideas.length === 0 || this.categories.length === 0) {
        // Wait until both arrays have been populated
        return;
      }

      // Get the canvas element
      const ctx = document.getElementById("pie-chart").getContext("2d");

      // Calculate the number of posts in each category
      const categoryCounts = {};
      this.ideas.forEach((idea) => {
        const category = this.categories.find((c) => c.id === idea.category_id);
        if (!categoryCounts[category.name]) {
          categoryCounts[category.name] = 0;
        }
        categoryCounts[category.name]++;
      });

      // Create the data object for the chart
      const data = {
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            data: Object.values(categoryCounts),
            backgroundColor: [
              "#E91E63", // pink
              "#4CAF50", // green
              "#3F51B5", // indigo
              "#673AB7", // deep purple
              "#9E9E9E", // grey
              "#2196F3", // blue
              "#795548", // brown
              "#FF9800", // orange
              "#FF5722", // deep orange
              "#FFEB3B", // yellow
              "#607D8B", // blue grey
              // ... add more colors as needed
            ],
            hoverBackgroundColor: [
              "#E91E63", // pink
              "#4CAF50", // green
              "#3F51B5", // indigo
              "#673AB7", // deep purple
              "#9E9E9E", // grey
              "#2196F3", // blue
              "#795548", // brown
              "#FF9800", // orange
              "#FF5722", // deep orange
              "#FFEB3B", // yellow
              "#607D8B", // blue grey
              // ... add more colors as needed
            ],
          },
        ],
      };

      // Create the chart
      new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
          //disable automatic resizing
          responsive: true,
          legend: {
            position: "right",
          },
        },
      });
    },
  },
};
</script>

<style>
/* #pie-chart {
  width: 300px;
  height: 300px;
} */
</style>
