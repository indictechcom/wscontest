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
                <th>
                    <div class="row">
                    <span>Project</span>
                    <div class="coloumn">
                        <button @click="sortBy('project', 'asc')" :class="{ 'active': sortField === 'project' && sortOrder === 'asc' }">&#9650;</button>
                        <button @click="sortBy('project', 'desc')" :class="{ 'active': sortField === 'project' && sortOrder === 'desc' }">&#9660;</button>
                
                    </div>
                    </div>
                    </th>
                <th>Start date</th>
                <th>End date</th>
                <th>
                    <div class="row">
                    <span>Created on</span>
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
                    <button class = name @click="details">{{ row.name }}</button>
                </td>
                <td>{{ row.project }}</td>
                <td>{{ row.startDate }}</td>
                <td>{{ row.endDate }}</td>
                <td>{{ row.createdOn }}</td>
            </tr>
        </tbody>
    </table>
    </div>
  </template>
  
  <style scoped>

    .createbutton{
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-left: auto;
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
    padding: 20px;
    }

    h2 {
    margin-bottom: 10px;
    }

    p {
    margin-bottom: 20px;
    font-size: 18px;
    }

    table {
    width: 100%;
    border-collapse: collapse;
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
    background-color: #f9f9f9;
    }

    tbody tr:nth-child(even) {
    background-color: #f9f9f9;
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
        background-color: #00000000;
        color: #007bff;
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

export default {
  name: 'Contest',
  data() {
    return {
      rows: [
        {
          id: 1,
          name: 'Contest 1',
          project: 'Project 1',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          createdOn: '2023-01-01'
        },
        {
          id: 2,
          name: 'Contest 2',
          project: 'Project 2',
          startDate: '2023-02-01',
          endDate: '2023-11-30',
          createdOn: '2023-02-01'
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
    details(){
        this.$router.push('/Contestdetails');
    }
    },
    mounted() {
        this.filteredRows = this.rows;
        // axios.get('')
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
  