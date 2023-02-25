<template>
  <div class="about">
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
