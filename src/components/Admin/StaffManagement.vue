<template>
  <h3>User Table</h3>
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
        <button class="delete-button" @click="confirmDelete(employee._id)">
          Kick
        </button>
      </td>
    </tr>
  </table>

  <div class="formbold-main-wrapper">
    <div class="formbold-form-wrapper">
      <h3>Add new employee here:</h3>
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="formbold-mb-3">
          <label for="email" class="formbold-form-label">
            <h5>Email:</h5>
          </label>
          <input
            placeholder="Email..."
            type="email"
            required
            v-model="email"
            class="formbold-form-input"
          /><br />
          <span class="error">{{ emailError }}</span>

          <label for="password" class="formbold-form-label">
            <h5>Password:</h5>
          </label>
          <input
            placeholder="Password..."
            type="password"
            required
            v-model="password"
            class="formbold-form-input"
          />
          <br />
          <span class="error">{{ passwordError }}</span>

          <label for="role" class="formbold-form-label"> <h5>Role:</h5></label>
          <select class="formbold-form-input" required v-model="role">
            <option class="formbold-form-input" value="Admin">Admin</option>
            <option class="formbold-form-input" value="Manager">Manager</option>
            <option selected class="formbold-form-input" value="Staff">
              Staff
            </option>
          </select>
        </div>
        <button class="formbold-btn">Create</button>
      </form>
    </div>
  </div>
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
          axios.post("http://localhost:8081/addUserInfo", {
            email: this.email,
            role: this.role,
          });
        })
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

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Roboto");
* {
  margin: auto;
  padding: 0;
  outline: 0;
}

.filter {
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgb(233, 76, 161);
  background: -moz-linear-gradient(
    90deg,
    rgba(233, 76, 161, 1) 0%,
    rgba(199, 74, 233, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(233, 76, 161, 1) 0%,
    rgba(199, 74, 233, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(233, 76, 161, 1) 0%,
    rgba(199, 74, 233, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e94ca1",endColorstr="#c74ae9",GradientType=1);
  opacity: 0.7;
}
table {
  margin: 0px auto;
  z-index: 2;
  left: 50%;
  top: 50%;
  width: 80%;
  border-spacing: 0;
  box-shadow: 0 2px 15px rgba(64, 64, 64, 0.7);
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}
td,
th {
  padding: 15px 20px;
  text-align: center;
}
th {
  background-color: #ba68c8;
  color: #fafafa;
  font-family: "Open Sans", Sans-serif;
  font-weight: 200;
  text-transform: uppercase;
}
tr {
  width: 100%;
  background-color: #fafafa;
  font-family: "Montserrat", sans-serif;
}
tr:nth-child(even) {
  background-color: #eeeeee;
}

/* Create new user form styling here: */
h3 {
  font-size: 25px;
  font-weight: 500;
  font-family: "Game-of-Thrones";
  line-height: 42px;
  color: #331c0e;
  text-align: center;
}
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Inter", sans-serif;
}
.formbold-mb-3 {
  margin-bottom: 5px;
}

.formbold-main-wrapper {
  display: flex;
  max-height: 650px;
  margin-top: 20px;
  padding: 20px;
}

.formbold-form-wrapper {
  margin: 0 auto;
  max-width: 570px;
  width: 100%;
  background: #f0ffff;
  border: 3px black;
  border-radius: 15px;
  box-shadow: 10px 10px 5px lightblue;
}

.formbold-img {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.formbold-input-wrapp > div {
  display: flex;
  gap: 20px;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}
.formbold-input-flex > div {
  width: 50%;
}
.formbold-form-input {
  width: 90%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  color: black;
  outline: none;
  resize: none;
}
.formbold-form-input::placeholder,
select.formbold-form-input,
.formbold-form-input[type="date"]::-webkit-datetime-edit-text,
.formbold-form-input[type="date"]::-webkit-datetime-edit-month-field,
.formbold-form-input[type="date"]::-webkit-datetime-edit-day-field,
.formbold-form-input[type="date"]::-webkit-datetime-edit-year-field {
  color: rgba(83, 99, 135, 0.5);
}

.formbold-form-input:focus {
  border-color: #6a64f1;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
.formbold-form-label {
  color: #07074d;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
}

.formbold-form-file-flex {
  display: flex;
  align-items: center;
  gap: 20px;
}
.formbold-form-file-flex .formbold-form-label {
  margin-bottom: 0;
}
.formbold-form-file {
  font-size: 14px;
  line-height: 24px;
  color: #536387;
}
.formbold-form-file::-webkit-file-upload-button {
  display: none;
}
.formbold-form-file:before {
  content: "Upload file";
  display: inline-block;
  background: #eeeeee;
  border: 0.5px solid #fbfbfb;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 3px 12px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  color: #637381;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-right: 10px;
}

.formbold-btn {
  text-align: center;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  padding: 14px 25px;
  border: none;
  font-weight: 500;
  background-color: #6a64f1;
  color: white;
  cursor: pointer;
  margin-top: 25px;
}
.formbold-btn:hover {
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-w-45 {
  width: 45%;
}

.error {
  color: red;
}
</style>
