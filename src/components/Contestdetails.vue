<template>
    <div class="details">
      <h2>Contest Info</h2>
      <br>
      <hr/>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Contestdetails',
  data() {
    return {
      administrators: [],
      books: [],
      contestDetails: null,
      users: []
    };
  },
  mounted() {
    axios.get('')
    .then(response => {
        const data = response.data;
        this.administrators = data.adminstrators;
        this.books = data.books;
        this.contestDetails = data.contest_details;
        this.users = data.users;
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  },


methods: {
    
}
}

</script>

<style scoped>
  .details{
    padding-top: 70px;
    color: black
  }


</style>