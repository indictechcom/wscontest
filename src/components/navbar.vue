<script setup>
import { useUser } from '../stores/user.js'

const { isLoggedIn, username, login, logout } = useUser()
</script>


<template>
  <v-app-bar
    color="primary"
    elevation="2"
    app
    height="64"
    class="navbar-custom"
  >
    <!-- App Title -->
    <v-app-bar-title class="title-text font-weight-bold">
      Wikisource contest
    </v-app-bar-title>

    <!-- Navigation Items (centered) -->
    <div class="flex-grow-1 d-flex justify-center">
      <v-btn
        variant="text"
        color="white"
        :to="'/'"
        class="nav-btn mx-2"
      >
        Home
      </v-btn>
      <v-btn
        variant="text"
        color="white"
        :to="'/Contestlist'"
        class="nav-btn mx-2"
      >
        Contest
      </v-btn>
      <v-btn
        variant="text"
        color="white"
        :to="'/Graph'"
        class="nav-btn mx-2"
      >
        Graph
      </v-btn>
    </div>

    <!-- User Section -->
    <div class="user-section">
      <div v-if="isLoggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="white"
              class="user-btn"
            >
              <v-avatar size="32" color="accent" class="me-2">
                <span class="white--text font-weight-bold">
                  {{ username ? username.charAt(0).toUpperCase() : 'U' }}
                </span>
              </v-avatar>
              {{ username }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          
          <v-card min-width="200" class="user-card">
            <v-card-text class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-avatar size="40" color="accent" class="me-3">
                  <span class="white--text font-weight-bold text-h6">
                    {{ username ? username.charAt(0).toUpperCase() : 'U' }}
                  </span>
                </v-avatar>
                <div>
                  <div class="font-weight-medium">{{ username }}</div>
                  <div class="text-caption text-medium-emphasis">User</div>
                </div>
              </div>
              <v-divider class="mb-3"></v-divider>
              <v-btn
                color="error"
                variant="outlined"
                block
                @click="logout"
                class="logout-btn"
              >
                <v-icon left>mdi-logout</v-icon>
                Logout
              </v-btn>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
      
      <v-btn
        v-else
        color="accent"
        variant="elevated"
        @click="login"
        class="login-btn"
      >
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
.navbar-custom {
  z-index: 1000 !important;
}

.title-text {
  color: white !important;
  font-size: 1.5rem !important;
  letter-spacing: 0.5px;
}

.nav-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.user-section {
  margin-right: 16px;
}

.user-btn {
  text-transform: none !important;
  font-weight: 500 !important;
}

.user-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  border-radius: 8px !important;
}

.logout-btn {
  text-transform: none !important;
  font-weight: 500 !important;
}

.login-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

.v-avatar {
  background-color: #0088bb !important;
}

.white--text {
  color: white !important;
}
</style>
