<template>
    <div class="details">
      <h2>Contest Info</h2>
      
      <hr/>
      <br>
      <ul v-if="contestDetails">
      <li>Contest Name: {{ contestDetails.name }}</li>
      <li>Started On: {{ contestDetails.start_date}}</li>
      <li>Ends On: {{ contestDetails.end_date}}</li>
      <li>Created On: {{contestDetails.createdon}}</li>
      <li>Created By: {{contestDetails.created_by}}</li>
      <li>Contest Running: {{ contestDetails.status }}</li>
      <li>Points Per Proofread: {{ contestDetails.point_per_proofread }}</li>
      <li>Points Per Validate: {{ contestDetails.point_per_validate }}</li>
      </ul>

    <br>
    

    <h3>Administrators</h3>
    
    <hr/>
    <br>
    <ol>
      <li v-for="(admin, index) in administrators" :key="index">
        {{ admin }}
      </li>
    </ol>

    <br>
    

    <h3>Books</h3>
    
    <hr/>
    <br>
    <ol>
      <li v-for="(page, index) in books" :key="index">
        {{ page }}
      </li>
    </ol>

    <br>

    <h2>Scores</h2>
    <hr/>

  <table id="proofread">
  <thead>

    <tr>
      <th>Users</th>
      <th>Pages</th>
      <th>Points</th>
      <th>Proofread Count</th>
      <th>Validated Count</th>
    </tr>

  </thead>
  <tbody>
    <tr v-for="(user, index) in users" :key="index">
          <td>{{ Object.keys(user)[0] }}</td>
          <td>
            <ul>
              <li v-for="(page, pageIndex) in user[Object.keys(user)[0]].pages" :key="pageIndex">
                {{ page.page_name }}
              </li>
            </ul>
          </td>
          <td>{{ user[Object.keys(user)[0]].points }}</td>
          <td>{{ user[Object.keys(user)[0]].proofread_count }}</td>
          <td>{{ user[Object.keys(user)[0]].validated_count }}</td>
      </tr>

  </tbody>

</table>


    </div>
</template>

<script>

import axios from 'axios';
import Contest from './Contest.vue';
import API_URL from '../globals.js';

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
    // const contestId = this.$route.params.id;

    // Make GET request using the emitted URL
    axios.get(API_URL + "/contest/" + 1)
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


}

</script>

<style scoped>
  .details{
    padding-top: 70px;
    color: black
  }


  #proofread {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

#proofread th {
  background-color: #f2f2f2;
  color: #333;
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

#proofread td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

#proofread thead th {
  font-weight: bold;
}

#proofread tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

#proofread tbody tr:hover {
  background-color: #e0e0e0;
}


</style>
