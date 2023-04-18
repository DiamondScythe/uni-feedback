<template>
  <!-- <br />
  Id: {{ details.id }}
  <br />
  Title: {{ details.title }}
  <br />
  Body: {{ details.body }}
  <br />
  User id: {{ details.user_id }}
  {{ details }} -->
  <h1>Idea Detail Page</h1>
  <div class="container-fluid" style="margin-top: 3%; height: 550px">
    <div class="container">
      <!-- Main content -->
      <div class="row">
        <div
          class="col-lg-8"
          style="margin-bottom: ($spacer * 0.25) !important"
        >
          <!-- Details -->
          <div class="card mb-4">
            <div class="card-body">
              <div class="mb-3 d-flex justify-content-between">
                <div>
                  <span class="me-3">Posted on {{ formattedDate }}</span>
                  <span class="me-3">#16123222</span>
                </div>
              </div>
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td class="text-end">Idea ID:</td>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="text-reset">{{ details.id }}</h6>
                          <span class="small"></span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-end">Idea title:</td>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="text-reset">{{ details.title }}</h6>
                          <span class="small"></span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-end">Idea description:</td>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="text-reset">{{ details.body }}</h6>
                          <span class="small"></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-end">User Email:</td>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-lg-grow-1 ms-3">
                          <h6 class="text-reset">{{ userDetails.email }}</h6>
                          <span class="small"></span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-end">Attached File:</td>
                    <td>
                      <div class="d-flex mb-2">
                        <div class="flex-lg-grow-1 ms-3" v-if="fileExists">
                          <h6 class="text-reset">
                            <a :href="downloadLink">{{ details.file_name }}</a>
                          </h6>
                          <span class="small"></span>
                        </div>
                        <div class="text-reset" v-else>No attached file</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Payment -->
        </div>
        <div class="col-lg-4">
          <!-- Customer Notes -->
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="h6">Notice to staff:</h3>
              <p>
                Greenwich facility on Cong Hoa Street is temporarily closed.
                Please check your email daily to acquire latest news.
              </p>
            </div>
          </div>
          <div class="card mb-4">
            <!-- Shipping information -->
            <div class="card-body">
              <h3 class="h6">Head of IT Department</h3>
              <strong>Hồ Nguyễn Phú Bảo</strong>
              <hr />
              <h3 class="h6">Address</h3>
              <address>
                20 Đ. Cộng Hòa, Phường 12, Tân Bình,<br />
                Thành phố Hồ Chí Minh 700000<br />
                <abbr title="Phone">P:</abbr> 093 310 85 54
              </address>
            </div>
          </div>
          <PostVoting
            v-if="details.id"
            :user_id="details.user_id"
            :idea_id="details.id"
          />
        </div>
      </div>
    </div>
  </div>
  <Comments v-if="details.id" :idea_id="details.id" />
</template>

<script>
import axios from "axios";
import Comments from "../components/Comments.vue";
import PostVoting from "../components/PostVoting.vue";

export default {
  components: {
    Comments,
    PostVoting,
  },
  name: "DetailsView",
  props: ["id"],
  data() {
    return {
      userDetails: {},
      details: {},
    };
  },
  computed: {
    fileExists() {
      //returns true if details.file_name is not null
      return this.details.file_name != null;
    },
    downloadLink() {
      //returns the link for downloading the file
      return "http://localhost:8081/download/" + this.details.file_name;
    },
    formattedDate() {
      //returns the date in a readable format
      const formattedDate = new Date(this.details.uploaded_date);
      return formattedDate.toLocaleString();
    },
  },
  mounted() {
    axios.get("http://localhost:8081/details?id=" + this.id).then((res) => {
      this.details = res.data;
      axios
        .get("http://localhost:8081/user?id=" + this.details.user_id)
        .then((res) => {
          this.userDetails = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>

<style scoped>
h1 {
  font-family: "Game-of-Thrones";
  color: #331c0e;
  text-align: center;
  font-size: 30px;
  margin-top: 2%;
}
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 15%);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
}
.text-reset {
  --bs-text-opacity: 1;
  color: inherit !important;
}
a {
  color: #5465ff;
  text-decoration: none;
}
</style>
