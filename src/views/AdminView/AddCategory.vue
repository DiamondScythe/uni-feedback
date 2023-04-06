<template>
    <div class="home">
      <h1>Add New User</h1>
      <button>Back to category list</button>
      <br>
      <AddCategoryForm></AddCategoryForm>
    </div>
</template>

<script>

import AddCategoryForm from "@/components/AddCategoryForm.vue";
export default {
    name: 'AddCategory',
    components: {AddCategoryForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
