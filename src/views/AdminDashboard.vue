<template>
  <div class="container">
    <div class="sidebar">
      <!-- List of links for the sidebar -->
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
    <div class="content">
      <!-- Your components will go here -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.sidebar {
  width: 20%;
  background-color: #f1f1f1;
  padding: 20px;
}

.content {
  width: 80%;
  padding: 20px;
}
</style>
