<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png">
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
