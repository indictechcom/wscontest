<template>
  <div class="list-wrapper">
    <v-container class="list-container">
      <!-- Header Section -->
      <div class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-6">
        <div class="mb-4 mb-sm-0">
          <h1 class="text-h4 font-weight-bold text-primary mb-2">
            <v-icon left class="mr-2">mdi-trophy-variant</v-icon>
            Contest List
          </h1>
          <p class="text-h6 text-medium-emphasis">
            Total Contests: <span class="font-weight-bold text-primary">{{ rows.length }}</span>
          </p>
        </div>
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          :to="'/Createcontest'"
          class="create-button"
        >
          <v-icon left>mdi-plus</v-icon>
          Create Contest
        </v-btn>
      </div>

      <!-- Search Section -->
      <v-card class="mb-6" elevation="2">
        <v-card-text class="pa-4">
          <v-text-field
            v-model="searchQuery"
            placeholder="Search contests by name..."
            variant="outlined"
            density="comfortable"
            single-line
            hide-details
            prepend-inner-icon="mdi-magnify"
            clearable
            class="search-field"
          />
        </v-card-text>
      </v-card>

      <!-- Mobile Cards View (xs and sm screens) -->
      <div class="d-block d-md-none">
        <v-row v-if="sortedRows.length > 0">
          <v-col cols="12" v-for="contest in sortedRows" :key="contest.id">
            <v-card class="contest-mobile-card" elevation="2" hover @click="details(contest.id)">
              <v-card-text class="pa-4">
                <div class="d-flex align-start justify-space-between mb-3">
                  <div class="flex-grow-1">
                    <h3 class="text-h6 font-weight-bold text-primary mb-1">
                      {{ contest.name }}
                    </h3>
                    <v-chip
                      :color="contest.status ? 'success' : 'warning'"
                      variant="flat"
                      size="small"
                      class="mb-2"
                    >
                      <v-icon left size="x-small">
                        {{ contest.status ? 'mdi-play-circle' : 'mdi-check-circle' }}
                      </v-icon>
                      {{ contest.status ? 'Running' : 'Completed' }}
                    </v-chip>
                  </div>
                  <v-icon color="primary">mdi-chevron-right</v-icon>
                </div>
                
                <v-row dense>
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis mb-1">Start Date</div>
                    <div class="text-body-2 font-weight-medium">
                      <v-icon size="small" color="success" class="mr-1">mdi-calendar-start</v-icon>
                      {{ formatDate(contest.start_date) }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis mb-1">End Date</div>
                    <div class="text-body-2 font-weight-medium">
                      <v-icon size="small" color="error" class="mr-1">mdi-calendar-end</v-icon>
                      {{ formatDate(contest.end_date) }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <v-card v-else class="text-center pa-8" elevation="0" variant="outlined">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-trophy-variant-outline</v-icon>
          <h3 class="text-h6 mb-2">No contests found</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Create your first contest to get started!
          </p>
          <v-btn color="primary" :to="'/Createcontest'">
            <v-icon left>mdi-plus</v-icon>
            Create Contest
          </v-btn>
        </v-card>
      </div>

      <!-- Desktop Table View (md and larger screens) -->
      <v-card class="d-none d-md-block" elevation="2">
        <v-card-title class="bg-primary text-white py-4">
          <v-icon left class="mr-2">mdi-view-list</v-icon>
          <span class="text-h6">All Contests</span>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-data-table
            v-if="sortedRows.length > 0"
            :headers="headers"
            :items="sortedRows"
            :items-per-page="10"
            class="elevation-0"
            item-key="id"
            density="comfortable"
            :search="searchQuery"
            hover
          >
            <template v-slot:item.name="{ item }">
              <div class="d-flex align-center py-2">
                <v-avatar color="primary" class="mr-3" size="32">
                  <v-icon color="white" size="small">mdi-trophy</v-icon>
                </v-avatar>
                <v-btn
                  variant="text"
                  color="primary"
                  class="contest-name-btn text-start"
                  @click="details(item.id)"
                >
                  {{ item.name }}
                </v-btn>
              </div>
            </template>

            <template v-slot:item.start_date="{ item }">
              <div class="d-flex align-center">
                <v-icon size="small" color="success" class="mr-2">mdi-calendar-start</v-icon>
                <span class="text-body-2">{{ formatDate(item.start_date) }}</span>
              </div>
            </template>

            <template v-slot:item.end_date="{ item }">
              <div class="d-flex align-center">
                <v-icon size="small" color="error" class="mr-2">mdi-calendar-end</v-icon>
                <span class="text-body-2">{{ formatDate(item.end_date) }}</span>
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status ? 'success' : 'warning'"
                variant="flat"
                size="small"
              >
                <v-icon left size="x-small">
                  {{ item.status ? 'mdi-play-circle' : 'mdi-check-circle' }}
                </v-icon>
                {{ item.status ? 'Running' : 'Completed' }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                color="primary"
                variant="outlined"
                size="small"
                @click="details(item.id)"
              >
                <v-icon left size="small">mdi-eye</v-icon>
                View
              </v-btn>
            </template>
          </v-data-table>
          
          <div v-else class="text-center pa-12">
            <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-trophy-variant-outline</v-icon>
            <h3 class="text-h6 mb-2">No contests found</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Create your first contest to get started!
            </p>
            <v-btn color="primary" :to="'/Createcontest'">
              <v-icon left>mdi-plus</v-icon>
              Create Contest
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
  
<style scoped>
.list-wrapper {
  padding-top: 80px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

/* Header styling */
h1 {
  color: #1976d2;
}

/* Create button styling */
.create-button {
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2) !important;
}

.create-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
}

/* Search field styling */
.search-field {
  max-width: 100%;
}

/* Mobile contest cards */
.contest-mobile-card {
  border-radius: 8px !important;
  border-left: 4px solid #1976d2;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
}

.contest-mobile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Desktop table styling */
.v-data-table {
  border-radius: 0 !important;
}

.v-data-table .v-data-table__td {
  padding: 12px 16px !important;
  font-size: 0.875rem !important;
  border-bottom: 1px solid #e0e0e0 !important;
}

.v-data-table .v-data-table__th {
  padding: 12px 16px !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  background-color: #f8f9fa !important;
}

.v-data-table tbody tr:hover {
  background-color: #f5f7fa !important;
}

/* Contest name button styling */
.contest-name-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  justify-content: flex-start !important;
  padding-left: 8px !important;
  text-align: left !important;
}

.contest-name-btn:hover {
  background-color: rgba(25, 118, 210, 0.08) !important;
}

/* Card styling */
.v-card {
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
  background-color: white;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.v-card-title {
  font-size: 1.1rem !important;
  padding: 16px 20px !important;
}

/* Status chips */
.v-chip {
  font-weight: 500 !important;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .list-container {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 960px) {
  .list-wrapper {
    padding-top: 80px;
  }
  
  .list-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 600px) {
  .list-wrapper {
    padding-top: 70px;
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .list-container {
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .create-button {
    width: 100%;
    margin-top: 16px;
  }
  
  h1 {
    font-size: 1.5rem !important;
  }
  
  .contest-mobile-card {
    margin-bottom: 8px;
  }
}

/* Empty state styling */
.text-center .v-icon {
  opacity: 0.6;
}

/* Animation for mobile cards */
.contest-mobile-card {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
      searchQuery: '',
      headers: [
        { 
          title: 'Contest Name', 
          key: 'name', 
          sortable: true,
          width: '30%'
        },
        { 
          title: 'Start Date', 
          key: 'start_date', 
          sortable: true,
          width: '20%'
        },
        { 
          title: 'End Date', 
          key: 'end_date', 
          sortable: true,
          width: '20%'
        },
        { 
          title: 'Status', 
          key: 'status', 
          sortable: true,
          width: '15%'
        },
        { 
          title: 'Actions', 
          key: 'actions', 
          sortable: false,
          width: '15%'
        }
      ]
    };
  },
  computed: {
    sortedRows() {
      if (!this.searchQuery) {
        return this.rows;
      }
      
      return this.rows.filter(row =>
        row.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    details(contestId) {
      this.$router.push(`/Contestdetails/${contestId}`);
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },
  mounted() {
    axios.get(API_URL + "/contests")
      .then(response => {
        this.rows = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
</script>

