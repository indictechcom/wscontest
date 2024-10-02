<template>
    <div class="contest">
        <br>
        <button class="createbutton">
            <router-link to="/Createcontest">Create Contest</router-link>
        </button>
      <h2>Contest List</h2>
      <p>Total Contest: {{ rows.length }}</p>

    <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="Search...">
    </div>

    <main class = 'table'>
        <!-- <section class = 'table_header'>
            <h1>Contests</h1>
        </section> -->
        <section class="table_body">
            <table id="Content table">
        <thead>
            <tr>
                <th>
                    <div class="row">
                    <span>Name</span>
                    <div class="coloumn">
                        <button @click="sortBy('name', 'asc')" :class="{ 'active': sortField === 'name' && sortOrder === 'asc' }">&#9650;</button>
                        <button @click="sortBy('name', 'desc')" :class="{ 'active': sortField === 'name' && sortOrder === 'desc' }">&#9660;</button>
                    </div>
                    </div>
                </th>
                <th>Start date</th>
                <th>End date</th>
                <th>
                    <div class="row">
                    <span>Contest Status</span>
                    <div class="coloumn">
                        <button @click="sortBy('createdOn', 'asc')" :class="{ 'active': sortField === 'createdOn' && sortOrder === 'asc' }">&#9650;</button>
                        <button @click="sortBy('createdOn', 'desc')" :class="{ 'active': sortField === 'createdOn' && sortOrder === 'desc' }">&#9660;</button>
                
                    </div>
                    </div>
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in sortedRows" :key="row.id">
                <td>
                    <button class = name @click="details(row.id)">{{ row.name }}</button>
                </td>
                <td>{{ row.start_date }}</td>
                <td>{{ row.end_date }}</td>
                <td>
                    <p :class="{ 'status-completed': row.status === 'completed', 'status-running': row.status === 'running' }">{{ row.status }}</p>
                </td>
            </tr>
        </tbody>
    </table>
    </section>
        
    </main>
      
    </div>
  </template>
  
  <style scoped>



    .createbutton{
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-left: auto;
        position: relative;
        right: 4.9rem;
        top: 2rem;
    }

    

    .contest {
    width: 100vw;
    background-color: white;
    min-height: 100vh;
    padding-top: 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding: 0px;
    }

    h2 {
    margin-bottom: 10px;
    }

    p {
    margin-bottom: 20px;
    font-size: 18px;
    }

    /*table, th, td{
        padding: 1rem;
        border-collapse: collapse;
    }

    td{
        height: 11%;
    }

    main.table{
        width: 82vw;
        height: 90vh;
        background-color: ;
        box-shadow: 0 .4rem .8rem #0005;
        border-radius: .8rem;
    }

    .table_header{
        width: 100%;
        height: 10%;
        padding: .8rem 1rem;
    }

    .table_body{
        width: 75%;
        max-height: calc(70% - .8rem);
        margin: .1rem auto;
        border-radius: .6 rem;
        background-color: #d6d6d622
    }

    table{
        width: 100%;
    }

    thead th {
        position: sticky;
        top: 0;
        left: 0;
        background-color: #d6d6d64f;
    }

    tbody tr:nth-child(even){
        background-color: #206ec256;
    }

    tbody tr:hover{
        background-color: #ffffffbc
    }*/

    thead th {
        position: sticky;
        top: 0;
        left: 0;
        background-color: #d6d6d64f;
    }

    .status-completed {
        padding: 0.2rem 0.5rem; /* Decreased padding */
        border-radius: 0.5rem; /* Adjusted border-radius for a smaller effect */
        background-color: #9bef51;
        text-align: center;
        display: inline-block;
    }

    .status-running {
        padding: 0.2rem 0.5rem; /* Decreased padding */
        border-radius: 0.5rem; /* Adjusted border-radius for a smaller effect */
        background-color: #006b21;
        text-align: center;
        display: inline-block;
    }

    main.table{
        width: 95%;
        box-shadow: 0 .4rem .8rem #0005;
        border-radius: .8rem;
    }

    table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Arial', sans-serif;
    }

    th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    }

    
    th {
    background-color: #f2f2f2;
    }

    tr:hover {
    background-color: #f5f5f5;
    }

    thead {
    background-color: #006699ea;
    }

    tbody tr:nth-child(even) {
    background-color: #00669987;
    }

    tbody tr:nth-child(odd) {
    background-color: #fff;
    }

    th, td {
    border: 1px solid #ddd;
    }

    table {
    margin-top: 20px;
    }

    th, td {
    text-align: center;
    }

    .name{
        /* background-color: #00000000;
        color: #007bff; */
        background-color: transparent;
        color: #007bff;
        border: none;
        cursor: pointer;
    }

    .name:hover {
        text-decoration: underline;
    }

    .search-box {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        }

    .search-box input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coloumn{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
    }

    

    .row span {
        flex-grow: 1;
        text-align: center;
    }

    

    button {
        margin-left: 5px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: #888;
    }

    button.active {
    color: #000;
    }
  </style>
  
  

<script>

import axios from 'axios';
import API_URL from '../globals.js';

export default {
  name: 'Contest',
  data() {
    return {
      rows: [
        {
          id: 1,
          name: 'Contest 1',
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          status: 'completed'
        },
        {
          id: 2,
          name: 'Contest 2',
          start_date: '2023-02-01',
          end_date: '2023-11-30',
          status: 'running'
        },
      ],
      filteredRows: [],
      searchQuery: '',
      sortField: '',
      sortOrder: 'asc'
    };
    },
    computed: {
        sortedRows() {
            if (this.sortField) {
                return this.filteredRows.sort((a, b) => {
                const modifier = this.sortOrder === 'desc' ? -1 : 1;
                if (this.sortField === 'createdOn') {
                    return modifier * (new Date(a[this.sortField]) - new Date(b[this.sortField]));
                } else {
                    return modifier * a[this.sortField].localeCompare(b[this.sortField]);
                }
                });
            } else {
                return this.filteredRows;
            }
        }
    },
    methods: {
    sortBy(field, order) {
      this.sortField = field;
      this.sortOrder = order;
    },
    details(next){
        this.$router.push('/Contestdetails');
        this.$emit('variable-passed', next);
    }
    },
    mounted() {
        this.filteredRows = this.rows;
        // axios.get(API_URL + "/contests")
        // .then(response => {
        //     this.rows = response.data;
        //     this.filteredRows = this.rows;
        // })
        // .catch(error => {
        //     console.error('Error fetching data:', error);
        // });
    },
    watch: {
        searchQuery(newVal) {
        this.filteredRows = this.rows.filter(row =>
            row.name.toLowerCase().includes(newVal.toLowerCase())
        );
        }
    },
}
</script>
  
