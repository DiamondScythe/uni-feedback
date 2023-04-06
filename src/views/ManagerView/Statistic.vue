<template>
    <div class="home">
      <h1>Welcome to uni-feedback!</h1>
      <h2>Statistic table:</h2>
      <br>
      <StatisticTable></StatisticTable>
    </div>
  </template>

<script>

import StatisticTable from "@/components/StatisticTable.vue";
export default {
    name: 'Statistic',
    components: {StatisticTable},
}

</script>

<style scoped>
    
</style>