<template>
  Current staff:
  <br />
  <table id="staffTable">
    <tr>
      <th>id</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
    <tr v-for="employee in staff" :key="employee._id">
      <td>{{ employee._id }}</td>
      <td>{{ employee.email }}</td>
      <td>{{ employee.role }}</td>
      <td>
        <button @click="confirmDelete(employee._id)">Kick</button>
      </td>
    </tr>
  </table>
  <br />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      staff: [],
    };
  },
  components: {},
  mounted() {
    axios
      .get("http://localhost:8081/getAllStaff")
      .then((res) => {
        this.staff = res.data;
      })
      .catch((err) => {
        console.log(error);
      });
  },
  methods: {
    confirmDelete(id) {
      if (confirm("Are you sure you want to kick this employee?")) {
        axios
          .delete("http://localhost:8081/deleteStaff?id=" + id)
          .then((res) => {
            return axios.get("http://localhost:8081/getAllStaff");
          })
          .then((res) => {
            this.staff = res.data;
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
