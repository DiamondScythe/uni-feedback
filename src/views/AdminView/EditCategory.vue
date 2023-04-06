<template>
    <div class="home">
      <h1>Edit Category</h1>
      <button>Back to category list</button>
      <br>
      <EditCategoryForm></EditCategoryForm>
    </div>
</template>

<script>

import EditCategoryForm from "@/components/EditCategoryForm.vue";
export default {
    name: 'EditCategory',
    components: {EditCategoryForm},
}

</script>

<style scoped>
body{
    background-color: #D8F2FF;
}   
</style>
