<template>
    <div class="home">
      <h1>Add New Department</h1>
      <button>Back to department list</button>
      <br>
      <AddDepartmentForm></AddDepartmentForm>
    </div>
</template>

<script>

import AddDepartmentForm from "@/components/AddDepartmentForm.vue";
export default {
    name: 'AddDepartment',
    components: {AddDepartmentForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
