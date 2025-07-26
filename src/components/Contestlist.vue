<template>
  <div class="contest">
    <br>
    <div style="display: flex;justify-content: space-between; width: 100%; padding-top: 2rem;">
      <h2>Contest List</h2>
      <v-btn
        color="primary"
        :to="'/Createcontest'"
        class="create-button"
      >
        Create Contest
      </v-btn>
    </div>
    
    <p>Total Contests: {{ rows.length }}</p>
    <br>

    <div class="search-box">
      <v-text-field
        v-model="searchQuery"
        placeholder="Search..."
        variant="outlined"
        density="compact"
        single-line
        hide-details
        style="width: 200px;"
      />
    </div>

    <main class="table">
      <section class="table_body">
        <table id="Content table">
          <thead>
            <tr>
              <th>
                <div class="row">
                  <span>Name</span>
                  <div class="column">
                    <button class="sortButton" @click="sortBy('name', 'asc')" :class="{ 'active': sortField === 'name' && sortOrder === 'asc' }">&#9650;</button>
                    <button class="sortButton" @click="sortBy('name', 'desc')" :class="{ 'active': sortField === 'name' && sortOrder === 'desc' }">&#9660;</button>
                  </div>
                </div>
              </th>
              <th>Start date</th>
              <th>End date</th>
              <th>
                <div class="row">
                  <span>Contest Status</span>
                  <div class="column">
                    <button class="sortButton" @click="sortBy('createdOn', 'asc')" :class="{ 'active': sortField === 'createdOn' && sortOrder === 'asc' }">&#9650;</button>
                    <button class="sortButton" @click="sortBy('createdOn', 'desc')" :class="{ 'active': sortField === 'createdOn' && sortOrder === 'desc' }">&#9660;</button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in sortedRows" :key="row.id">
              <td>
                <button class="name" @click="details(row.id)">{{ row.name }}</button>
              </td>
              <td>{{ row.start_date }}</td>
              <td>{{ row.end_date }}</td>
              <td>
                <p :class="{ 'status-running': row.status === true, 'status-completed': row.status === false }">{{ row.status ? 'Running' : 'Completed' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
  
<style scoped>
.sortButton {
  scale: .8;
  margin: 0;
  padding: 0;
}

.create-button {
  font-weight: 500;
  text-transform: none !important;
}

.contest {
  width: 80vw;
  color: #000;
  background-color: white;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  font-family: 'Arial', sans-serif;
  margin-top: 2rem;
}

h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #006699;
}

p {
  font-size: 18px;
  color: #333;
}

main.table {
  width: 100%;
  box-shadow: 0 .4rem .8rem #0005;
  border-radius: .8rem;
  margin: 0 auto;
  padding: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
  margin: 0;
  table-layout: fixed;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

th {
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: bold;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #006699ea;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: white;
}

th:nth-child(1), td:nth-child(1) {
  width: 30%;
}

th:nth-child(2), td:nth-child(2), 
th:nth-child(3), td:nth-child(3), 
th:nth-child(4), td:nth-child(4) {
  width: 23.33%;
}

tr:hover {
  background-color: #f5f5f5;
}

tbody tr:nth-child(even) {
  background-color: #00669987;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
}

th, td {
  border: 1px solid #ddd;
  font-size: 13px;
}

th, td {
  text-align: center;
}

.name {
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
}

.name:hover {
  text-decoration: underline;
}

.search-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column {
  position: absolute;
  right: 5%;
}

.row span {
  flex-grow: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

button.sort-btn {
  font-size: 10px;
  color: #555;
  background-color: #f2f2f2;
  padding: 2px 4px;
  margin: 2px 0;
  border-radius: 2px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: none;
}

button.sort-btn:hover {
  background-color: #007bff;
  color: #fff;
}

button.active {
  color: #000;
}

.status-completed {
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #438b04d9;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  font-family: 'Arial', sans-serif;
}

.status-running {
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #ecf158c6;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  font-family: 'Arial', sans-serif;
}
</style>
  

  
  
  

<script>
import axios from 'axios';
import API_URL from '../globals.js';

export default {
  name: 'Contestlist',
  data() {
    return {
      rows: [],
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
    details(contestId) {
      this.$router.push(`/Contestdetails/${contestId}`);
    }
  },
  mounted() {
    this.filteredRows = this.rows;
    axios.get(API_URL + "/contests")
      .then(response => {
        this.rows = response.data;
        this.filteredRows = this.rows;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  watch: {
    searchQuery(newVal) {
      this.filteredRows = this.rows.filter(row =>
        row.name.toLowerCase().includes(newVal.toLowerCase())
      );
    }
  }
}
</script>

