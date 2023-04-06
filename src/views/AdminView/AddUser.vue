<template>
    <div class="home">
      <h1>Add New User</h1>
      <button>Back to user list</button>
      <br>
      <AddUserForm></AddUserForm>
    </div>
</template>

<script>

import AddUserForm from "@/components/AddUserForm.vue";
export default {
    name: 'AddUser',
    components: {AddUserForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
