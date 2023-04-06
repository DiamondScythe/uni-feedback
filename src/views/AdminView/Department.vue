<template>
    <div class="home">
      <h1>Welcome to uni-feedback!</h1>
      <h2>Department list:</h2>
      <button>Create New Department</button>
      <br>
      <DepartmentTable></DepartmentTable>
    </div>
  </template>

<script>

import DepartmentTable from "@/components/DepartmentTable.vue";
export default {
    name: 'Department',
    components: {DepartmentTable},
}

</script>

<style scoped>
    
</style>