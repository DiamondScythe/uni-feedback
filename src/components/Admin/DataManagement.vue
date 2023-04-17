<template>
  Download data?
  <br />
  <!-- unguarded download link, potentially insecure. Tried using axios but it didn't work. Will fix later -->
  <a href="http://localhost:8081/downloadCSV">Click here to download</a>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    downloadData() {},
  },
};
</script>
