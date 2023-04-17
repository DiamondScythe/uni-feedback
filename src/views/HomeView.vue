<template>
  <div class="home">
    <h1>Welcome to uni-feedback!</h1>
    <br />
    <IdeaTable></IdeaTable>
  </div>
</template>

<script>
// @ is an alias to /src
import IdeaTable from "@/components/IdeaTable.vue";

export default {
  name: "HomeView",
  components: {
    IdeaTable,
  },
};
</script>
