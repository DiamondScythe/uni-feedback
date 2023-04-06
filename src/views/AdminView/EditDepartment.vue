<template>
    <div class="home">
      <h1>Edit Department</h1>
      <button>Back to department list</button>
      <br>
      <EditDepartmentForm></EditDepartmentForm>
    </div>
</template>

<script>

import EditDepartmentForm from "@/components/EditDepartmentForm.vue";
export default {
    name: 'EditDepartment',
    components: {EditDepartmentForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
