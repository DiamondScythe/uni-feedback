<template>
  <div class="chart-container">
    <CategoryChart></CategoryChart>
  </div>
</template>

<script>
import CategoryChart from "./charts/CategoryChart.vue";

export default {
  data() {
    return {
      ideas: [],
      categories: [],
    };
  },

  components: {
    CategoryChart,
  },
};
</script>

<style>
.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
