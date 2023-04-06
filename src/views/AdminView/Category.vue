<template>
    <div class="home">
      <h1>Welcome to uni-feedback!</h1>
      <h2>Category list:</h2>
      <button>Create New Category</button>
      <br>
      <CategoryTable></CategoryTable>
    </div>
  </template>

<script>

import CategoryTable from "@/components/CategoryTable.vue";
export default {
    name: 'Category',
    components: {CategoryTable},
}

</script>

<style scoped>
    
</style>