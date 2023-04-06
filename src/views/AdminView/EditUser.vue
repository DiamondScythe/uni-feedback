<template>
    <div class="home">
      <h1>Edit User</h1>
      <button>Back to user list</button>
      <br>
      <EditUserForm></EditUserForm>
    </div>
</template>

<script>

import EditUserForm from "@/components/EditUserForm.vue";
export default {
    name: 'EditUser',
    components: {EditUserForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
