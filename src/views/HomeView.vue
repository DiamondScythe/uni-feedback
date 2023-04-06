<template>
  <div class="home">
    <h1>Welcome to uni-feedback!</h1>
    <h2>Idea table:</h2>
    <br>
    <IdeaTable></IdeaTable>
  </div>
</template>

<script>
// @ is an alias to /src
import IdeaTable from '@/components/IdeaTable.vue';

export default {
  name: 'HomeView',
  components: {
    IdeaTable
}
}
</script>

<style>
h1 {
    font-size: 25px;
    font-weight: 500;
    font-style: bold;
    font-family: "Game-of-Thrones";
    line-height: 42px;
    color:  #331C0E;
    text-align: center;
    margin-top: 10px;
}
h2 {
    font-size: 20px;
    font-weight: 300;
    font-style: bold;
    font-family: "Game-of-Thrones";
    line-height: 42px;
    color:  #331C0E;
    text-align: center;
}
</style>
