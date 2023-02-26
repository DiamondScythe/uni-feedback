<template>
    <div class="about">
        <PostForm/>    
    </div>
</template>
  

<script>
import PostForm from '@/components/PostForm.vue';

export default {
    name: 'PostView',
    components: {
        PostForm
    }
}
</script>