<template>
  <h2>Download data?</h2>
  <br />
  <!-- unguarded download link, potentially insecure. Tried using axios but it didn't work. Will fix later -->
  <button class="next-button"> <a href="http://localhost:8081/downloadCSV">Click here to download</a> </button>
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

<style>
.next-button {
        background-color: #1f2937;
        color: white;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        cursor: pointer;
        background-color: #30353b;
        opacity: 0.5;
        font-family: Monospace, 'Lucida Console', sans-serif;
        font-size: 20px;
        
    }

        .next-button:hover {
        background-color: #1f2937;
        transition: background-color 0.3s ease;
        opacity: 1;
        }
        
        .next-button a {
  text-decoration: none;
}
        </style>
