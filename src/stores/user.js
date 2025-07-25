import { ref, computed } from 'vue'
import axios from 'axios'
import API_URL from '../globals.js'

// Configure axios defaults
axios.defaults.withCredentials = true

// Global state
const user = ref(null)
const loading = ref(false)
const error = ref(null)

// Computed properties
const isLoggedIn = computed(() => user.value !== null)
const username = computed(() => user.value?.username || null)
const userid = computed(() => user.value?.userid || null)

// Actions
const fetchUser = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get(`${API_URL}/api/user`)
    
    if (response.data.logged_in) {
      user.value = {
        username: response.data.username,
        userid: response.data.userid
      }
    } else {
      user.value = null
    }
  } catch (err) {
    console.error('Error fetching user info:', err)
    error.value = 'Failed to fetch user information'
    user.value = null
  } finally {
    loading.value = false
  }
}

const login = () => {
  // Redirect to backend login
  window.location.href = `${API_URL}/login`
}

const logout = async () => {
  try {
    await axios.get(`${API_URL}/logout`)
    user.value = null
    // Redirect to home page after logout
    window.location.href = '/'
  } catch (err) {
    console.error('Error during logout:', err)
    // Force logout even if request fails
    user.value = null
    window.location.href = '/'
  }
}

// Initialize user state on app load
const initializeAuth = async () => {
  await fetchUser()
}

export function useUser() {
  return {
    // State
    user,
    loading,
    error,
    
    // Computed
    isLoggedIn,
    username,
    userid,
    
    // Actions
    fetchUser,
    login,
    logout,
    initializeAuth
  }
}
