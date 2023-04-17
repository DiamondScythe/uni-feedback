<template>
  <div class="about">
    <SignupForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "SignupView",
  components: {
    SignupForm,
  },
};
</script>
