<template>
    <div class="home">
      <h1>Welcome to uni-feedback!</h1>
      <h2>User table:</h2>
      <button>Create New User</button>
      <br>
      <UserTable></UserTable>
    </div>
  </template>

<script>

import UserTable from "@/components/UserTable.vue";
export default {
    name: 'User',
    components: {UserTable},
}

</script>

<style scoped>
    
</style>