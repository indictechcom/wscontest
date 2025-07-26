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
      <v-card class="mb-4" elevation="2">
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
      <v-card elevation="2" class="scores-card">
        <v-card-title class="bg-info text-white py-3 sticky-header">
          <v-icon left class="mr-2">mdi-chart-line</v-icon>
          <span class="text-h6">User Scores & Performance ({{ users.length }} participants)</span>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-data-table
            v-if="users.length > 0"
            :headers="headers"
            :items="formattedUsers"
            :items-per-page="10"
            class="elevation-0 compact-table"
            item-key="user"
            density="compact"
          >
            <template v-slot:item.user="{ item }">
              <div class="d-flex align-center py-1">
                <v-avatar color="primary" class="mr-2" size="28">
                  <span class="text-caption">{{ item.user.charAt(0).toUpperCase() }}</span>
                </v-avatar>
                <span class="text-body-2 font-weight-medium">{{ item.user }}</span>
              </div>
            </template>

            <template v-slot:item.pages="{ item }">
              <div class="d-flex flex-wrap ga-1">
                <v-chip
                  v-for="(page, index) in item.pages.slice(0, 2)"
                  :key="index"
                  size="x-small"
                  color="secondary"
                  variant="outlined"
                >
                  {{ page.page_name }}
                </v-chip>
                <v-chip 
                  v-if="item.pages.length > 2"
                  size="x-small"
                  color="grey"
                  variant="outlined"
                >
                  +{{ item.pages.length - 2 }}
                </v-chip>
              </div>
            </template>

            <template v-slot:item.points="{ item }">
              <v-chip color="warning" variant="elevated" size="small">
                <v-icon left size="x-small">mdi-star</v-icon>
                {{ item.points }}
              </v-chip>
            </template>

            <template v-slot:item.proofread_count="{ item }">
              <v-chip color="info" variant="outlined" size="small">
                {{ item.proofread_count }}
              </v-chip>
            </template>

            <template v-slot:item.validated_count="{ item }">
              <v-chip color="success" variant="outlined" size="small">
                {{ item.validated_count }}
              </v-chip>
            </template>
          </v-data-table>
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
        { title: 'User', key: 'user', sortable: true },
        { title: 'Pages', key: 'pages', sortable: false },
        { title: 'Points', key: 'points', sortable: true },
        { title: 'Proofread Count', key: 'proofread_count', sortable: true },
        { title: 'Validated Count', key: 'validated_count', sortable: true },
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
        const userData = user[username];
        return {
          user: username,
          pages: userData.pages,
          points: userData.points,
          proofread_count: userData.proofread_count,
          validated_count: userData.validated_count
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
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
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
  padding-top: 80px;
  padding-bottom: 20px;
}

.details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
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
  padding: 8px 12px !important;
  font-size: 0.875rem !important;
}

.compact-table .v-data-table__th {
  padding: 8px 12px !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
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
    padding-top: 80px;
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
    padding-top: 70px;
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
}
</style>
