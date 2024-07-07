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
    
}
}

</script>

<style scoped>
  .details{
    padding-top: 70px;
    color: black
  }


</style>