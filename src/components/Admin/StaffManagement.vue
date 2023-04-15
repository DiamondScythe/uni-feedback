<template>
  Current staff:
  <br />
  <table id="staffTable">
    <tr>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
    <tr v-for="employee in staff" :key="employee.id">
      <td>{{ employee.email }}</td>
      <td>{{ employee.role }}</td>
      <td>
        <button>Kick</button>
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
};
</script>
