<template>
  <div class="container">
    <div class="sidebar">
      <h5 style="color:green;">Admin Menu:</h5>
      <div class="sidebar-holder">
      <!-- List of links for the sidebar -->
        <ul>
          <li><button class= "button" href="#" @click="categoryOn">Category Management</button></li>
          <li><button class= "button" href="#" @click="staffOn">Staff Management</button></li>
          <li><button class= "button" href="#" @click="ideaOn">Idea Management</button></li>
          <li><button class= "button" href="#" @click="dataOn">Data Management</button></li>
          <li><button class= "button" href="#" @click="closureOn">Closure Management</button></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <!-- Content goes here -->
      <CategoryManagement v-if="categoryShow"></CategoryManagement>
      <StaffManagement v-if="staffShow"></StaffManagement>
      <IdeaManagement v-if="ideaShow"></IdeaManagement>
      <DataManagement v-if="dataShow"></DataManagement>
      <ClosureManagement v-if="closureShow"></ClosureManagement>
    </div>
  </div>
</template>

<script>
import CategoryManagement from "../components/Admin/CategoryManagement.vue";
import StaffManagement from "../components/Admin/StaffManagement.vue";
import IdeaManagement from "../components/Admin/IdeaManagement.vue";
import DataManagement from "../components/Admin/DataManagement.vue";
import ClosureManagement from "../components/Admin/ClosureManagement.vue";

export default {
  data() {
    return {
      ideaShow: false,
      categoryShow: true,
      staffShow: false,
      dataShow: false,
      closureShow: false,
    };
  },
  components: {
    CategoryManagement,
    StaffManagement,
    IdeaManagement,
    DataManagement,
    ClosureManagement,
  },
  methods: {
    categoryOn() {
      this.categoryShow = true;
      this.staffShow = false;
      this.ideaShow = false;
      this.dataShow = false;
      this.closureShow = false;
    },
    staffOn() {
      this.categoryShow = false;
      this.staffShow = true;
      this.ideaShow = false;
      this.dataShow = false;
      this.closureShow = false;
    },
    ideaOn() {
      this.categoryShow = false;
      this.staffShow = false;
      this.ideaShow = true;
      this.dataShow = false;
      this.closureShow = false;
    },
    dataOn() {
      this.categoryShow = false;
      this.staffShow = false;
      this.ideaShow = false;
      this.dataShow = true;
      this.closureShow = false;
    },
    closureOn() {
      this.categoryShow = false;
      this.staffShow = false;
      this.ideaShow = false;
      this.dataShow = false;
      this.closureShow = true;
    },
  },
};
</script>

<style scoped>
h5 {
  font-family: Monospace, 'Lucida Console', sans-serif;
}
.container {
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 20%;
  margin: 0 auto;
  background:#F0FFFF;
  border: 3px black;
  border-radius: 15px;
  box-shadow: 5px 5px 5px lightblue;
}

.content {
  width: 80%;
  padding: 20px;
}

ul {
  list-style: none;
}

.button {
  font-family: Monospace, 'Lucida Console', sans-serif;
  background-color: white;
  color: black;
  border: 2px solid #4CAF50; /* Green */
  margin: 5px;
  border-radius: 4px;
  width: 180px;
  height: 50px;
  box-shadow: 2px 2px 2px green;

}

</style>
