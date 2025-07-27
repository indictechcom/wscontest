<template>
  <div class="details-wrapper">
    <v-container class="details-container">
      <v-row>
        <!-- Contest Info Card - Left Side -->
        <v-col cols="12" md="8">
          <v-card class="mb-4" elevation="2">
            <v-card-title class="bg-primary text-white py-3">
              <v-icon left class="mr-2">mdi-trophy</v-icon>
              <span class="text-h6">Contest Information</span>
            </v-card-title>
            <v-card-text v-if="contestDetails" class="pa-4">
              <v-row dense>
                <v-col cols="12" sm="6" v-for="(item, index) in contestInfoItems" :key="index">
                  <v-card variant="outlined" class="pa-3 h-100 info-card" hover>
                    <div class="d-flex align-center">
                      <v-avatar :color="item.color" size="32" class="mr-3">
                        <v-icon :icon="item.icon" color="white" size="small"></v-icon>
                      </v-avatar>
                      <div class="flex-grow-1">
                        <div class="text-caption text-medium-emphasis mb-1">{{ item.label }}</div>
                        <div class="text-subtitle-1 font-weight-medium">{{ item.value }}</div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Books Card - Right Side -->
        <v-col cols="12" md="4">
          <v-card class="mb-4" elevation="2" style="height: fit-content;">
            <v-card-title class="bg-success text-white py-3">
              <v-icon left class="mr-2">mdi-book-multiple</v-icon>
              <span class="text-h6">Books ({{ books.length }})</span>
            </v-card-title>
            <v-card-text class="pa-4">
              <div v-if="books.length > 0">
                <v-card 
                  v-for="(book, index) in books" 
                  :key="index" 
                  variant="outlined" 
                  class="pa-2 mb-2 text-center book-card" 
                  hover
                >
                  <div class="d-flex align-center">
                    <v-icon size="24" color="success" class="mr-2">mdi-book-open-page-variant</v-icon>
                    <div class="text-body-2 font-weight-medium text-left">{{ book }}</div>
                  </div>
                </v-card>
              </div>
              <v-alert v-else type="info" variant="tonal" density="compact">
                No books assigned to this contest yet.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Administrators Card - Full Width Below -->
      <v-card class="mb-2" elevation="2">
        <v-card-title class="bg-secondary text-white py-3">
          <v-icon left class="mr-2">mdi-account-supervisor</v-icon>
          <span class="text-h6">Administrators ({{ administrators.length }})</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row v-if="administrators.length > 0" dense>
            <v-col cols="6" sm="4" md="3" lg="2" v-for="(admin, index) in administrators" :key="index">
              <v-card variant="outlined" class="pa-3 text-center admin-card" hover>
                <v-avatar color="secondary" size="40" class="mb-2">
                  <span class="text-subtitle-2">{{ admin.charAt(0).toUpperCase() }}</span>
                </v-avatar>
                <div class="text-body-2 font-weight-medium">{{ admin }}</div>
              </v-card>
            </v-col>
          </v-row>
          <v-alert v-else type="info" variant="tonal" density="compact">
            No administrators assigned to this contest yet.
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Scores Card - Full Width with Sticky Header -->
      <v-card elevation="2" class="scores-card mt-0">
        <v-card-title class="bg-info text-white py-2 sticky-header">
          <v-icon left class="mr-2">mdi-chart-line</v-icon>
          <span class="text-h6">User Scores & Performance ({{ users.length }} participants)</span>
        </v-card-title>
        <v-card-text class="pa-0">
          <!-- Desktop Table View -->
          <v-data-table
            v-if="users.length > 0"
            :headers="headers"
            :items="formattedUsers"
            :items-per-page="10"
            class="elevation-0 compact-table d-none d-md-table"
            item-key="user"
            density="comfortable"
          >
            <template v-slot:item.user="{ item }">
              <div class="d-flex align-center py-2">
                <v-avatar color="primary" class="mr-3" size="32">
                  <span class="text-caption font-weight-bold">{{ item.user.charAt(0).toUpperCase() }}</span>
                </v-avatar>
                <div>
                  <div class="text-body-2 font-weight-medium">{{ item.user }}</div>
                  <div class="text-caption text-medium-emphasis">Participant</div>
                </div>
              </div>
            </template>

            <template v-slot:item.pages="{ item }">
              <div class="pages-container">
                <div class="d-flex flex-wrap ga-1 mb-1" v-if="(item.pages || []).length > 0">
                  <v-chip
                    v-for="(page, index) in (item.pages || []).slice(0, 3)"
                    :key="index"
                    size="x-small"
                    color="secondary"
                    variant="outlined"
                    class="page-chip"
                  >
                    {{ page.page_name || page }}
                  </v-chip>
                  <v-chip 
                    v-if="(item.pages || []).length > 3"
                    size="x-small"
                    color="grey"
                    variant="outlined"
                    class="page-chip"
                  >
                    +{{ (item.pages || []).length - 3 }} more
                  </v-chip>
                </div>
                <div class="text-caption text-medium-emphasis" v-else>
                  No pages worked
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ (item.pages || []).length }} page{{ (item.pages || []).length !== 1 ? 's' : '' }} total
                </div>
              </div>
            </template>

            <template v-slot:item.points="{ item }">
              <div class="text-center">
                <v-chip color="warning" variant="elevated" size="small" class="points-chip">
                  <v-icon left size="x-small">mdi-star</v-icon>
                  {{ item.points || 0 }}
                </v-chip>
                <div class="text-caption text-medium-emphasis mt-1">points</div>
              </div>
            </template>

            <template v-slot:item.proofread_count="{ item }">
              <div class="text-center">
                <v-chip color="info" variant="outlined" size="small" class="count-chip">
                  <v-icon left size="x-small">mdi-file-document-edit</v-icon>
                  {{ item.proofread_count || 0 }}
                </v-chip>
                <div class="text-caption text-medium-emphasis mt-1">proofread</div>
              </div>
            </template>

            <template v-slot:item.validated_count="{ item }">
              <div class="text-center">
                <v-chip color="success" variant="outlined" size="small" class="count-chip">
                  <v-icon left size="x-small">mdi-check-circle</v-icon>
                  {{ item.validated_count || 0 }}
                </v-chip>
                <div class="text-caption text-medium-emphasis mt-1">validated</div>
              </div>
            </template>
          </v-data-table>
          
          <!-- Mobile Cards View -->
          <div v-if="users.length > 0" class="d-block d-md-none pa-4">
            <v-card
              v-for="(user, index) in formattedUsers"
              :key="index"
              class="mb-3 user-score-card"
              elevation="1"
              hover
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-center mb-3">
                  <v-avatar color="primary" class="mr-3" size="40">
                    <span class="text-subtitle-2 font-weight-bold">{{ user.user.charAt(0).toUpperCase() }}</span>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="text-h6 font-weight-medium">{{ user.user }}</div>
                    <div class="text-caption text-medium-emphasis">Participant</div>
                  </div>
                  <v-chip color="warning" variant="elevated" size="small">
                    <v-icon left size="x-small">mdi-star</v-icon>
                    {{ user.points || 0 }} pts
                  </v-chip>
                </div>
                
                <v-row dense class="mb-3">
                  <v-col cols="6">
                    <div class="text-center pa-2 bg-grey-lighten-4 rounded">
                      <v-icon color="info" class="mb-1">mdi-file-document-edit</v-icon>
                      <div class="text-h6 font-weight-bold">{{ user.proofread_count || 0 }}</div>
                      <div class="text-caption">Proofread</div>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-center pa-2 bg-grey-lighten-4 rounded">
                      <v-icon color="success" class="mb-1">mdi-check-circle</v-icon>
                      <div class="text-h6 font-weight-bold">{{ user.validated_count || 0 }}</div>
                      <div class="text-caption">Validated</div>
                    </div>
                  </v-col>
                </v-row>
                
                <div v-if="(user.pages || []).length > 0">
                  <div class="text-subtitle-2 mb-2">Pages Worked ({{ (user.pages || []).length }})</div>
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip
                      v-for="(page, pageIndex) in (user.pages || []).slice(0, 4)"
                      :key="pageIndex"
                      size="x-small"
                      color="secondary"
                      variant="outlined"
                    >
                      {{ page.page_name || page }}
                    </v-chip>
                    <v-chip 
                      v-if="(user.pages || []).length > 4"
                      size="x-small"
                      color="grey"
                      variant="outlined"
                    >
                      +{{ (user.pages || []).length - 4 }} more
                    </v-chip>
                  </div>
                </div>
                <div v-else class="text-center text-medium-emphasis">
                  <v-icon size="large" color="grey-lighten-1">mdi-file-document-outline</v-icon>
                  <div class="text-body-2">No pages worked yet</div>
                </div>
              </v-card-text>
            </v-card>
          </div>
          
          <v-alert v-else type="info" variant="tonal" class="ma-4" density="compact">
            No participants in this contest yet.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import axios from 'axios';
import API_URL from '../globals.js';

export default {
  name: 'Contestdetails',
  data() {
    return {
      administrators: [],
      books: [],
      contestDetails: null,
      users: [],
      headers: [
        { title: 'User', key: 'user', sortable: true, width: '25%' },
        { title: 'Pages Worked', key: 'pages', sortable: false, width: '30%' },
        { title: 'Total Points', key: 'points', sortable: true, width: '15%' },
        { title: 'Proofread', key: 'proofread_count', sortable: true, width: '15%' },
        { title: 'Validated', key: 'validated_count', sortable: true, width: '15%' },
      ],
    };
  },
  computed: {
    contestInfoItems() {
      if (!this.contestDetails) return [];
      
      return [
        {
          label: 'Contest Name',
          value: this.contestDetails.name,
          icon: 'mdi-trophy',
          color: 'primary'
        },
        {
          label: 'Started On',
          value: this.formatDate(this.contestDetails.start_date),
          icon: 'mdi-calendar-start',
          color: 'success'
        },
        {
          label: 'Ends On',
          value: this.formatDate(this.contestDetails.end_date),
          icon: 'mdi-calendar-end',
          color: 'error'
        },
        {
          label: 'Created On',
          value: this.formatDate(this.contestDetails.createdon),
          icon: 'mdi-calendar-plus',
          color: 'info'
        },
        {
          label: 'Created By',
          value: this.contestDetails.created_by,
          icon: 'mdi-account-circle',
          color: 'secondary'
        },
        {
          label: 'Status',
          value: this.contestDetails.status ? 'Active' : 'Inactive',
          icon: this.contestDetails.status ? 'mdi-check-circle' : 'mdi-pause-circle',
          color: this.contestDetails.status ? 'success' : 'warning'
        },
        {
          label: 'Points Per Proofread',
          value: this.contestDetails.point_per_proofread,
          icon: 'mdi-star',
          color: 'warning'
        },
        {
          label: 'Points Per Validate',
          value: this.contestDetails.point_per_validate,
          icon: 'mdi-star-check',
          color: 'warning'
        }
      ];
    },
    formattedUsers() {
      return this.users.map(user => {
        const username = Object.keys(user)[0];
        const userData = user[username] || {};
        return {
          user: username,
          pages: userData.pages || [],
          points: userData.points || 0,
          proofread_count: userData.proofread_count || 0,
          validated_count: userData.validated_count || 0
        };
      });
    }
  },
  watch: {
    '$route'(to, from) {
      // React to route changes if user navigates directly to a contest details URL
      if (to.params.id !== from.params.id) {
        this.fetchContestDetails(to.params.id);
      }
    }
  },
  methods: {
    fetchContestDetails(contestId) {
      axios.get(API_URL + "/contest/" + contestId)
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
    formatDate(dateString) {
      console.log('Formatting date:', dateString, 'Type:', typeof dateString);
      
      if (!dateString || dateString === null || dateString === undefined || dateString === '') {
        console.log('Date is null/undefined/empty');
        return 'N/A';
      }
      
      try {
        let date;
        
        // If it's already a Date object
        if (dateString instanceof Date) {
          date = dateString;
        }
        // If it's a string, handle different formats
        else if (typeof dateString === 'string') {
          const cleanedString = dateString.trim();
          
          // Handle DD-MM-YYYY format (most common from API)
          if (cleanedString.includes('-')) {
            const parts = cleanedString.split('-');
            if (parts.length === 3) {
              // Check if it's DD-MM-YYYY (day is 1-2 digits, month is 1-2 digits, year is 4 digits)
              const [first, second, third] = parts;
              if (first.length <= 2 && second.length <= 2 && third.length === 4) {
                // DD-MM-YYYY format
                const day = parseInt(first, 10);
                const month = parseInt(second, 10);
                const year = parseInt(third, 10);
                
                // Validate ranges
                if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900) {
                  date = new Date(year, month - 1, day); // Month is 0-indexed in JS Date
                } else {
                  console.log('Invalid date ranges:', day, month, year);
                  return 'Invalid Date';
                }
              } else {
                // Try ISO format or other standard format
                date = new Date(cleanedString);
              }
            } else {
              date = new Date(cleanedString);
            }
          }
          // Handle DD/MM/YYYY format
          else if (cleanedString.includes('/')) {
            const parts = cleanedString.split('/');
            if (parts.length === 3) {
              const [first, second, third] = parts;
              if (first.length <= 2 && second.length <= 2 && third.length === 4) {
                // DD/MM/YYYY format
                const day = parseInt(first, 10);
                const month = parseInt(second, 10);
                const year = parseInt(third, 10);
                
                if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900) {
                  date = new Date(year, month - 1, day);
                } else {
                  return 'Invalid Date';
                }
              } else {
                date = new Date(cleanedString);
              }
            } else {
              date = new Date(cleanedString);
            }
          }
          // Handle other formats
          else {
            date = new Date(cleanedString);
          }
        }
        // If it's a number (timestamp)
        else if (typeof dateString === 'number') {
          date = new Date(dateString);
        }
        else {
          console.log('Unknown date format:', typeof dateString);
          return 'Invalid Date Format';
        }
        
        // Check if the date is valid
        if (!date || isNaN(date.getTime())) {
          console.log('Date is invalid after parsing:', date);
          return 'Invalid Date';
        }
        
        const formatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
        console.log('Formatted date result:', formatted);
        return formatted;
        
      } catch (error) {
        console.error('Error formatting date:', error, 'Original value:', dateString);
        return 'Date Error';
      }
    }
  },
  mounted() {
    const contestId = this.$route.params.id;
    this.fetchContestDetails(contestId);
  },


}

</script>

<style scoped>
.details-wrapper {
  padding-top: 240px;
  padding-bottom: 20px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Smaller card styling */
.info-card {
  min-height: 80px !important;
}

.info-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
}

.admin-card:hover,
.book-card:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Compact book card styling */
.book-card {
  border-radius: 6px !important;
  min-height: 50px !important;
}

/* Scores table with proper z-index */
.scores-card {
  position: relative;
  z-index: 10;
  margin-top: 0 !important;
}

.scores-card .v-card-title {
  margin-top: 0 !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.sticky-header {
  position: sticky;
  top: 60px; /* Adjust based on your navbar height */
  z-index: 15;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Compact table styling */
.compact-table {
  border-radius: 0 !important;
}

.compact-table .v-data-table__td {
  padding: 12px 16px !important;
  font-size: 0.875rem !important;
  vertical-align: top !important;
  border-bottom: 1px solid #e0e0e0 !important;
}

.compact-table .v-data-table__th {
  padding: 12px 16px !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  background-color: #f8f9fa !important;
}

.compact-table tbody tr:hover {
  background-color: #f5f7fa !important;
}

/* Pages container styling */
.pages-container {
  max-width: 250px;
}

.page-chip {
  margin-bottom: 2px !important;
  font-size: 0.75rem !important;
}

/* Points and counts styling */
.points-chip {
  font-weight: 600 !important;
  min-width: 60px !important;
}

.count-chip {
  font-weight: 500 !important;
  min-width: 50px !important;
}

/* Mobile user score cards */
.user-score-card {
  border-radius: 8px !important;
  border-left: 4px solid #1976d2;
  transition: all 0.2s ease;
}

.user-score-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Smaller cards overall */
.v-card {
  border-radius: 8px !important;
}

.v-card-title {
  font-size: 1.1rem !important;
  padding: 12px 16px !important;
}

/* Compact alerts */
.v-alert {
  font-size: 0.875rem !important;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .details-container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 960px) {
  .details-wrapper {
    padding-top: 220px;
  }
  
  .details-container {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .sticky-header {
    top: 60px;
  }
}

@media (max-width: 768px) {
  .details-wrapper {
    padding-top: 200px;
  }
  
  .details-container {
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .sticky-header {
    top: 50px;
  }
  
  .info-card {
    min-height: 70px !important;
  }
  
  .pages-container {
    max-width: 200px;
  }
  
  .compact-table .v-data-table__td {
    padding: 8px 6px !important;
    font-size: 0.8rem !important;
  }
  
  .page-chip {
    font-size: 0.7rem !important;
  }
}
</style>
