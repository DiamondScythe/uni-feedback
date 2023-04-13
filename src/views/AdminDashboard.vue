<template>
  <div class="container">
    <div class="sidebar">
      <!-- List of links for the sidebar -->
      <ul>
        <li><a href="#" @click="categoryOn">Category Management</a></li>
        <li><a href="#" @click="staffOn">Staff Management</a></li>
        <li><a href="#" @click="ideaOn">Idea Management</a></li>
      </ul>
    </div>
    <div class="content">
      <!-- Content goes here -->
      <CategoryManagement v-if="categoryShow"></CategoryManagement>
      <StaffManagement v-if="staffShow"></StaffManagement>
      <IdeaManagement v-if="ideaShow"></IdeaManagement>
    </div>
  </div>
</template>

<script>
import CategoryManagement from "../components/admin/CategoryManagement.vue";
import StaffManagement from "../components/admin/StaffManagement.vue";
import IdeaManagement from "../components/admin/IdeaManagement.vue";

export default {
  data() {
    return {
      ideaShow: false,
      categoryShow: true,
      staffShow: false,
    };
  },
  components: {
    CategoryManagement,
    StaffManagement,
    IdeaManagement,
  },
  methods: {
    categoryOn() {
      this.categoryShow = true;
      this.staffShow = false;
      this.ideaShow = false;
    },
    staffOn() {
      this.categoryShow = false;
      this.staffShow = true;
      this.ideaShow = false;
    },
    ideaOn() {
      this.categoryShow = false;
      this.staffShow = false;
      this.ideaShow = true;
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
