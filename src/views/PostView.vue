<template>
  <h1>Post Idea</h1>
  <PostForm v-if="closureDateCheck" />
  <!--if v-if fails, display notification message to user-->
  <div v-else>
    <h2>Sorry, the idea submission period is closed.</h2>
    <p>
      The idea submission period is currently closed. Please check back later.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import { getClosureDates } from "@/utils/closureCheck";

export default {
  data() {
    return {
      closureDateCheck: false,
      ideaClosureDate: null,
    };
  },
  async mounted() {
    // check if the current date is before the closure date
    const closureDates = await getClosureDates();
    console.log(closureDates);
    this.ideaClosureDate = closureDates.idea_closure;
    //compares current date to closure date
    this.closureDateCheck = new Date() < new Date(this.ideaClosureDate);
    console.log(this.closureDateCheck);
  },
  name: "PostView",
  components: {
    PostForm,
  },
};
</script>
