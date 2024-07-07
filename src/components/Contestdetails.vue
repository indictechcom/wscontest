<template>
    <div class="details">
      <h2>Contest Info</h2>
      
      <hr/>
      <br>
      <ul v-if="contestDetails">
      <li>Name: {{ contestDetails.name }}</li>
      <li>Started from: {{ contestDetails.start_date}}</li>
      <li>End on: {{ contestDetails.end_date}}</li>
      <li>Created on: {{contestDetails.createdon}}</li>
      <li>Created by: {{contestDetails.created_by}}</li>
      <li>Contest running status: {{ contestDetails.status }}</li>
      <li>point per proofread: {{ contestDetails.point_per_proofread }}</li>
      <li>point per validate: {{ contestDetails.point_per_validate }}</li>
      <li>status: {{ contestDetails.status }}</li>
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
    

    <h3>IndexPage</h3>
    
    <hr/>
    <br>
    <ol>
      <li v-for="(page, index) in books" :key="index">
        {{ page }}
      </li>
    </ol>

    <br>

    <h2>Scores</h2>
    <br>
    <h3>Proofread</h3>
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

    const data =
{
    "adminstrators": [
        "hrideshmg"
    ],
    "books": [
        "first",
        "second"
    ],
    "contest_details": {
        "created_by": null,
        "createdon": "Sat, 06 Jul 2024 21:56:29 GMT",
        "end_date": "Thu, 12 Dec 2024 00:00:00 GMT",
        "lang": "enc",
        "name": "first",
        "point_per_proofread": 3,
        "point_per_validate": 1,
        "start_date": "Mon, 11 Nov 2024 00:00:00 GMT",
        "status": true
    },
    "users": [
        {
            "dummy3": {
                "pages": [
                    {
                        "page_name": "bruh16"
                    },
                    {
                        "page_name": "bruh17"
                    }
                ],
                "points": 6,
                "proofread_count": 2,
                "validated_count": 0
            }
        }
    ]
}

this.administrators = data.adminstrators;
        this.books = data.books;
        this.contestDetails = data.contest_details;
        this.users = data.users;
        this.$root.$on('emit-url', this.handleEmitUrl);
    // axios.get('')
    // .then(response => {
    //     const data = response.data;
    //     this.administrators = data.adminstrators;
    //     this.books = data.books;
    //     this.contestDetails = data.contest_details;
    //     this.users = data.users;
    //   })
    //   .catch(error => {
    //     console.error('API call failed:', error);
    //   });
  },


methods: {
  handleEmitUrl(url) {
      // Make GET request using the emitted URL
      axios.get(url)
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
    }
    
}
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