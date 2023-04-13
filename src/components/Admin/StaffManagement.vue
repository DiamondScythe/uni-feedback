<template>
  Current staff:
  <br />
  <table id="staffTable">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
    <tr v-for="employee in staff" :key="employee.id">
      <td>{{ employee.name }}</td>
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
      staff: [
        {
          name: "John Doe",
          email: "email@gmail.com",
          role: "Admin",
        },
        {
          name: "Jane Doe",
          email: "email.gmail.com",
          role: "QA",
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
