<template>
  <div class="create-wrapper">
    <v-container class="create-container">
      <!-- Show login prompt if not authenticated -->
      <v-card v-if="!canCreateContest" class="login-card" elevation="2">
        <v-card-title class="bg-primary text-white py-3 text-center">
          <v-icon left class="mr-2">mdi-lock</v-icon>
          <span class="text-h6">Authentication Required</span>
        </v-card-title>
        <v-card-text class="pa-6 text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-account-circle</v-icon>
          <p class="text-h6 mb-4">You need to be logged in to create a contest.</p>
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            @click="login"
            class="login-btn"
          >
            <v-icon left>mdi-login</v-icon>
            Login with Wikimedia
          </v-btn>
        </v-card-text>
      </v-card>
      
      <!-- Show contest creation form if authenticated -->
      <div v-else>
        <v-card class="mb-4" elevation="2">
          <v-card-title class="bg-primary text-white py-3">
            <v-icon left class="mr-2">mdi-plus-circle</v-icon>
            <span class="text-h6">Create New Contest</span>
          </v-card-title>
          <v-card-text class="pa-4">
            <v-row>
              <!-- Contest Basic Info -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="primary" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-information</v-icon>
                    </v-avatar>
                    <span class="text-h6 font-weight-medium">Basic Information</span>
                  </div>
                  
                  <v-text-field
                    v-model="contestInfo"
                    label="Contest Name"
                    variant="outlined"
                    density="compact"
                    class="mb-3"
                    :rules="[v => !!v || 'Contest name is required']"
                  />
                  
                  <v-text-field
                    v-model="contestLang"
                    label="Language (ISO Code)"
                    variant="outlined"
                    density="compact"
                    maxlength="3"
                    hint="e.g., en, fr, de"
                    persistent-hint
                    :rules="[v => !!v || 'Language code is required']"
                  />
                </v-card>
              </v-col>

              <!-- Contest Dates -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="success" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-calendar-range</v-icon>
                    </v-avatar>
                    <span class="text-h6 font-weight-medium">Contest Duration</span>
                  </div>
                  
                  <v-text-field
                    v-model="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    density="compact"
                    class="mb-3"
                    :rules="[v => !!v || 'Start date is required']"
                  />
                  
                  <v-text-field
                    v-model="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    density="compact"
                    :rules="[v => !!v || 'End date is required']"
                  />
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mt-2">
              <!-- Books Section -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="info" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-book-multiple</v-icon>
                    </v-avatar>
                    <span class="text-h6 font-weight-medium">Books & Pages</span>
                  </div>
                  
                  <v-textarea
                    v-model="indexPages"
                    label="Index Pages"
                    variant="outlined"
                    rows="4"
                    hint="Enter book names or page indices, one per line"
                    persistent-hint
                    :rules="[v => !!v || 'At least one book/page is required']"
                  />
                </v-card>
              </v-col>

              <!-- Admins Section -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="secondary" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-account-supervisor</v-icon>
                    </v-avatar>
                    <span class="text-h6 font-weight-medium">Administrators</span>
                  </div>
                  
                  <v-textarea
                    v-model="admins"
                    label="Contest Administrators"
                    variant="outlined"
                    rows="4"
                    hint="Enter admin usernames, one per line"
                    persistent-hint
                    :rules="[v => !!v || 'At least one admin is required']"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Scoring System Card -->
        <v-card class="mb-4" elevation="2">
          <v-card-title class="bg-warning text-white py-3">
            <v-icon left class="mr-2">mdi-star</v-icon>
            <span class="text-h6">Scoring System</span>
          </v-card-title>
          <v-card-text class="pa-4">
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="warning" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-file-edit</v-icon>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <div class="text-body-1 font-weight-medium">Proofreading Points</div>
                      <div class="text-caption text-medium-emphasis">Points awarded for proofreading a page</div>
                    </div>
                  </div>
                  
                  <v-text-field
                    v-model="stov"
                    label="Points per Proofread"
                    type="number"
                    variant="outlined"
                    density="compact"
                    min="0"
                    :rules="[v => !!v || 'Points value is required', v => v >= 0 || 'Points must be non-negative']"
                  />
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined" class="pa-4 h-100" hover>
                  <div class="d-flex align-center mb-3">
                    <v-avatar color="success" size="32" class="mr-3">
                      <v-icon color="white" size="small">mdi-check-circle</v-icon>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <div class="text-body-1 font-weight-medium">Validation Points</div>
                      <div class="text-caption text-medium-emphasis">Points awarded for validating a page</div>
                    </div>
                  </div>
                  
                  <v-text-field
                    v-model="vtop"
                    label="Points per Validation"
                    type="number"
                    variant="outlined"
                    density="compact"
                    min="0"
                    :rules="[v => !!v || 'Points value is required', v => v >= 0 || 'Points must be non-negative']"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Action Buttons -->
        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="outlined"
            color="secondary"
            size="large"
            @click="$router.go(-1)"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Cancel
          </v-btn>
          
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            @click="post"
            :loading="isSubmitting"
          >
            <v-icon left>mdi-plus</v-icon>
            Create Contest
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
  
  <script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import API_URL from "../globals.js";
import { useUser } from '../stores/user.js';
import { useRouter } from 'vue-router';

const { isLoggedIn, login } = useUser()
const router = useRouter();

// Computed property to check if user can create contests
const canCreateContest = computed(() => isLoggedIn.value)

const contestInfo = ref('');
const contestLang = ref('');
const startDate = ref('');
const indexPages = ref('');
const endDate = ref('');
const admins = ref('');
const stov = ref('');
const vtop = ref('');
const isSubmitting = ref(false);

const post = async () => {
  isSubmitting.value = true;
  
  try {
    const response = await axios.post(API_URL + '/contest/create', {
      name: contestInfo.value,
      language: contestLang.value,
      start_date: startDate.value,
      book_names: indexPages.value,
      end_date: endDate.value,
      admins: admins.value,
      proofread_points: stov.value,
      validate_points: vtop.value
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response from API:', response.data);
    
    // Redirect to contest list on success
    router.push('/Contestlist');
  } catch (error) {
    console.error('Error creating contest:', error);
    // You could add a toast notification here
  } finally {
    isSubmitting.value = false;
  }
};
</script>
  
  <style scoped>
.create-wrapper {
  padding-top: 80px;
  padding-bottom: 20px;
}

.create-container {
  max-width: 95%;
  width: 95%;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

.login-card {
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px !important;
}

/* Card hover effects */
.v-card[variant="outlined"]:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
}

/* Consistent card styling */
.v-card {
  border-radius: 8px !important;
}

.v-card-title {
  font-size: 1.1rem !important;
  padding: 12px 16px !important;
}

/* Form validation styling */
.v-text-field, .v-textarea {
  margin-bottom: 8px;
}

/* Button styling */
.login-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .create-container {
    width: 96%;
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 960px) {
  .create-wrapper {
    padding-top: 80px;
  }
  
  .create-container {
    width: 97%;
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 768px) {
  .create-wrapper {
    padding-top: 70px;
  }
  
  .create-container {
    width: 98%;
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>

