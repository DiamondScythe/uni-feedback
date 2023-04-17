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
  <form @submit.prevent="handleSubmit" novalidate>
    <h3>Add new employee here:</h3>
    <label for="email">Email</label>
    <input type="email" required v-model="email" />
    <span class="error">{{ emailError }}</span>
    <label for="password">Password</label>
    <input type="password" required v-model="password" />
    <label for="role">Role:</label>
    <select class="select-list" required v-model="role">
      <option class="select-list" value="Admin">Admin</option>
      <option class="select-list" value="Manager">Manager</option>
      <option selected class="select-list" value="Staff">Staff</option>
    </select>
    <span class="error">{{ passwordError }}</span>
    <button type="submit" value="Add">Add</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      role: "Staff",
      signedIn: null,
      emailError: null,
      passwordError: null,
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
    handleSubmit() {
      this.resetErrors();
      axios
        .post(
          "http://localhost:8081/addStaff",
          {
            email: this.email,
            password: this.password,
            role: this.role,
          },
          { withCredentials: true }
        )
        .then((res) => {
          return axios.get("http://localhost:8081/getAllStaff");
        })
        .then((res) => {
          this.staff = res.data;
          this.clearForm();
        })
        .catch((err) => {
          console.log(err);
          this.emailError = err.response.data.errors.email;
          this.passwordError = err.response.data.errors.password;
        });
    },
    resetErrors() {
      this.emailError = null;
      this.passwordError = null;
    },
    clearForm() {
      this.email = "";
      this.password = "";
      this.role = "Staff";
    },
  },
};
</script>
