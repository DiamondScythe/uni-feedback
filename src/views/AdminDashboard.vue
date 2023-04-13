<template>
  <div class="container">
    <div class="sidebar">
      <!-- List of links for the sidebar -->
      <ul>
        <li><a href="#" @click="categoryOn">Category Management</a></li>
        <li><a href="#" @click="staffOn">Staff Management</a></li>
      </ul>
    </div>
    <div class="content">
      <!-- Content goes here -->
      <CategoryManagement v-if="categoryShow"></CategoryManagement>
      <StaffManagement v-if="staffShow"></StaffManagement>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryManagement from "../components/Admin/CategoryManagement.vue";
import StaffManagement from "../components/Admin/StaffManagement.vue";

export default {
  data() {
    return {
      categoryShow: true,
      staffShow: false,
    };
  },
  components: {
    CategoryManagement,
    StaffManagement,
  },
  methods: {
    categoryOn() {
      this.categoryShow = true;
      this.staffShow = false;
    },
    staffOn() {
      this.categoryShow = false;
      this.staffShow = true;
    },
  },
};
</script>

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

ul {
  list-style: none;
}
</style>
