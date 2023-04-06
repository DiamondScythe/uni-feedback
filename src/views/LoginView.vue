<template>
  <div class="login">
    <SigninForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import SigninForm from '@/components/SigninForm.vue';

export default {
  name: 'LoginView',
  components: {
    SigninForm
}
}
</script>

<style scoped>

</style>
