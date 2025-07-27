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

          <!-- Admin Actions Card (Only for Contest Admins) -->
          <v-card v-if="isContestAdmin" class="mb-4" elevation="2">
            <v-card-title class="bg-warning text-white py-3">
              <v-icon left class="mr-2">mdi-shield-crown</v-icon>
              <span class="text-h6">Admin Actions</span>
            </v-card-title>
            <v-card-text class="pa-4">
              <div class="d-flex flex-column ga-2">
                <v-btn
                  color="info"
                  variant="elevated"
                  block
                  @click="showAnalytics = !showAnalytics"
                  class="admin-btn"
                >
                  <v-icon left>mdi-chart-bar</v-icon>
                  {{ showAnalytics ? 'Hide Analytics' : 'View Analytics' }}
                </v-btn>
                
                <v-btn
                  color="primary"
                  variant="outlined"
                  block
                  @click="editContest"
                  class="admin-btn"
                >
                  <v-icon left>mdi-pencil</v-icon>
                  Edit Contest
                </v-btn>
                
                <v-btn
                  :color="contestDetails?.status ? 'error' : 'success'"
                  variant="outlined"
                  block
                  @click="toggleContestStatus"
                  class="admin-btn"
                >
                  <v-icon left>{{ contestDetails?.status ? 'mdi-pause' : 'mdi-play' }}</v-icon>
                  {{ contestDetails?.status ? 'Close Contest' : 'Reopen Contest' }}
                </v-btn>
              </div>
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

      <!-- Analytics Card (Only visible to Contest Admins) -->
      <v-card v-if="isContestAdmin && showAnalytics" elevation="2" class="mb-3">
        <v-card-title class="bg-purple text-white py-3">
          <v-icon left class="mr-2">mdi-chart-line</v-icon>
          <span class="text-h6">Contest Analytics</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="3" v-for="(stat, index) in contestStats" :key="index">
              <v-card variant="outlined" class="pa-3 text-center stat-card" hover>
                <v-avatar :color="stat.color" size="48" class="mb-2">
                  <v-icon :icon="stat.icon" color="white"></v-icon>
                </v-avatar>
                <div class="text-h4 font-weight-bold mb-1">{{ stat.value }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ stat.label }}</div>
              </v-card>
            </v-col>
          </v-row>
          
          <v-row class="mt-4">
            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-4">
                <h3 class="text-h6 mb-3">Top Performers</h3>
                <div v-if="topPerformers.length > 0">
                  <div v-for="(performer, index) in topPerformers" :key="index" class="d-flex align-center mb-2">
                    <v-chip color="primary" variant="elevated" size="small" class="mr-2">{{ index + 1 }}</v-chip>
                    <div class="flex-grow-1">
                      <div class="font-weight-medium">{{ performer.user }}</div>
                      <div class="text-caption">{{ performer.points }} points</div>
                    </div>
                    <v-chip color="warning" size="small">
                      <v-icon left size="x-small">mdi-star</v-icon>
                      {{ performer.points }}
                    </v-chip>
                  </div>
                </div>
                <div v-else class="text-center text-medium-emphasis">
                  No participants yet
                </div>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-4">
                <h3 class="text-h6 mb-3">Contest Progress</h3>
                <div class="mb-3">
                  <div class="d-flex justify-space-between mb-1">
                    <span>Days Elapsed</span>
                    <span>{{ daysElapsed }} / {{ totalDays }} days</span>
                  </div>
                  <v-progress-linear
                    :model-value="progressPercentage"
                    color="primary"
                    height="8"
                    rounded
                  ></v-progress-linear>
                </div>
                
                <div class="mb-3">
                  <div class="d-flex justify-space-between mb-1">
                    <span>Total Pages</span>
                    <span>{{ totalPages }}</span>
                  </div>
                  <div class="d-flex justify-space-between mb-1">
                    <span>Pages Worked</span>
                    <span>{{ workedPages }}</span>
                  </div>
                  <v-progress-linear
                    :model-value="pageProgressPercentage"
                    color="success"
                    height="8"
                    rounded
                  ></v-progress-linear>
                </div>
              </v-card>
            </v-col>
          </v-row>
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

    <!-- Edit Contest Dialog -->
    <v-dialog v-model="showEditDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="bg-primary text-white py-3">
          <v-icon left class="mr-2">mdi-pencil</v-icon>
          <span class="text-h6">Edit Contest Details</span>
        </v-card-title>
        
        <v-card-text class="pa-4">
          <v-form ref="editForm">
            <v-text-field
              v-model="editFormData.name"
              label="Contest Name"
              variant="outlined"
              density="compact"
              class="mb-3"
              :rules="[v => !!v || 'Contest name is required']"
            />
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editFormData.start_date"
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  density="compact"
                  :rules="[v => !!v || 'Start date is required']"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editFormData.end_date"
                  label="End Date"
                  type="date"
                  variant="outlined"
                  density="compact"
                  :rules="[v => !!v || 'End date is required']"
                />
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editFormData.point_per_proofread"
                  label="Points per Proofread"
                  type="number"
                  variant="outlined"
                  density="compact"
                  min="0"
                  :rules="[v => !!v || 'Points value is required', v => v >= 0 || 'Points must be non-negative']"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editFormData.point_per_validate"
                  label="Points per Validation"
                  type="number"
                  variant="outlined"
                  density="compact"
                  min="0"
                  :rules="[v => !!v || 'Points value is required', v => v >= 0 || 'Points must be non-negative']"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="secondary"
            @click="cancelEdit"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="saveContestChanges"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios';
import API_URL from '../globals.js';
import { useUser } from '../stores/user.js';

export default {
  name: 'Contestdetails',
  setup() {
    const { username, isLoggedIn } = useUser();
    return { username, isLoggedIn };
  },
  data() {
    return {
      administrators: [],
      books: [],
      contestDetails: null,
      users: [],
      showAnalytics: false,
      showEditDialog: false,
      editFormData: {
        name: '',
        start_date: '',
        end_date: '',
        point_per_proofread: 0,
        point_per_validate: 0
      },
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
    },
    isContestAdmin() {
      return this.isLoggedIn && this.username && this.administrators.includes(this.username);
    },
    contestStats() {
      const totalParticipants = this.users.length;
      const totalPoints = this.formattedUsers.reduce((sum, user) => sum + user.points, 0);
      const totalProofread = this.formattedUsers.reduce((sum, user) => sum + user.proofread_count, 0);
      const totalValidated = this.formattedUsers.reduce((sum, user) => sum + user.validated_count, 0);
      
      return [
        { label: 'Participants', value: totalParticipants, icon: 'mdi-account-group', color: 'primary' },
        { label: 'Total Points', value: totalPoints, icon: 'mdi-star', color: 'warning' },
        { label: 'Pages Proofread', value: totalProofread, icon: 'mdi-file-document-edit', color: 'info' },
        { label: 'Pages Validated', value: totalValidated, icon: 'mdi-check-circle', color: 'success' }
      ];
    },
    topPerformers() {
      return this.formattedUsers
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
    },
    daysElapsed() {
      if (!this.contestDetails?.start_date) return 0;
      const startDate = this.parseDate(this.contestDetails.start_date);
      const today = new Date();
      const diffTime = Math.abs(today - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    totalDays() {
      if (!this.contestDetails?.start_date || !this.contestDetails?.end_date) return 0;
      const startDate = this.parseDate(this.contestDetails.start_date);
      const endDate = this.parseDate(this.contestDetails.end_date);
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    progressPercentage() {
      if (this.totalDays === 0) return 0;
      return Math.min((this.daysElapsed / this.totalDays) * 100, 100);
    },
    totalPages() {
      return this.books.length;
    },
    workedPages() {
      const uniquePages = new Set();
      this.formattedUsers.forEach(user => {
        user.pages.forEach(page => {
          uniquePages.add(page.page_name || page);
        });
      });
      return uniquePages.size;
    },
    pageProgressPercentage() {
      if (this.totalPages === 0) return 0;
      return (this.workedPages / this.totalPages) * 100;
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
          
          // Initialize edit form data
          this.resetEditForm();
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
    },
    parseDate(dateString) {
      if (!dateString) return new Date();
      
      try {
        if (typeof dateString === 'string') {
          const cleanedString = dateString.trim();
          
          if (cleanedString.includes('-')) {
            const parts = cleanedString.split('-');
            if (parts.length === 3) {
              const [first, second, third] = parts;
              if (first.length <= 2 && second.length <= 2 && third.length === 4) {
                const day = parseInt(first, 10);
                const month = parseInt(second, 10);
                const year = parseInt(third, 10);
                return new Date(year, month - 1, day);
              }
            }
          }
        }
        return new Date(dateString);
      } catch (error) {
        return new Date();
      }
    },
    editContest() {
      // For now, we'll create a simple modal for editing contest details
      // In production, you might want a separate edit page
      this.showEditDialog = true;
    },
    async toggleContestStatus() {
      if (!confirm(`Are you sure you want to ${this.contestDetails.status ? 'close' : 'reopen'} this contest?`)) {
        return;
      }

      try {
        const newStatus = !this.contestDetails.status;
        
        const response = await axios.patch(
          `${API_URL}/contest/${this.$route.params.id}/status`,
          { status: newStatus },
          { 
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (response.data.success) {
          this.contestDetails.status = newStatus;
          alert(`Contest ${newStatus ? 'reopened' : 'closed'} successfully!`);
        } else {
          alert('Error: ' + response.data.message);
        }
        
      } catch (error) {
        console.error('Error updating contest status:', error);
        if (error.response && error.response.data && error.response.data.message) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('Error updating contest status. Please try again.');
        }
      }
    },
    async saveContestChanges() {
      try {
        const response = await axios.put(
          `${API_URL}/contest/${this.$route.params.id}`,
          {
            name: this.editFormData.name,
            start_date: this.editFormData.start_date,
            end_date: this.editFormData.end_date,
            point_per_proofread: this.editFormData.point_per_proofread,
            point_per_validate: this.editFormData.point_per_validate
          },
          { 
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (response.data.success) {
          // Update local data
          Object.assign(this.contestDetails, this.editFormData);
          this.showEditDialog = false;
          alert('Contest updated successfully!');
          
          // Refresh the page data
          this.fetchContestDetails(this.$route.params.id);
        } else {
          alert('Error: ' + response.data.message);
        }
        
      } catch (error) {
        console.error('Error updating contest:', error);
        if (error.response && error.response.data && error.response.data.message) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('Error updating contest. Please try again.');
        }
      }
    },
    cancelEdit() {
      this.showEditDialog = false;
      // Reset form data to original values
      this.resetEditForm();
    },
    resetEditForm() {
      if (this.contestDetails) {
        this.editFormData = {
          name: this.contestDetails.name,
          start_date: this.formatDateForInput(this.contestDetails.start_date),
          end_date: this.formatDateForInput(this.contestDetails.end_date),
          point_per_proofread: this.contestDetails.point_per_proofread,
          point_per_validate: this.contestDetails.point_per_validate
        };
      }
    },
    formatDateForInput(dateString) {
      if (!dateString) return '';
      
      try {
        // Parse the date and format it as YYYY-MM-DD for HTML date input
        const date = this.parseDate(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (error) {
        console.error('Error formatting date for input:', error);
        return '';
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

/* Admin action buttons */
.admin-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  margin-bottom: 8px !important;
}

/* Analytics stats cards */
.stat-card {
  border-radius: 8px !important;
  transition: all 0.2s ease;
}

.stat-card:hover {
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
