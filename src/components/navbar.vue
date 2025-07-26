<script setup>
import { useUser } from '../stores/user.js'

const { isLoggedIn, username, login, logout } = useUser()
</script>


<template>
    <!-- <div id="navigation"> -->
        <nav class="navbar">
        <a class="title">Wikisource contest</a>
        <div class="navbar-nav">
            <ul class="navbar-items">
                <li class="navbar-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="navbar-item">
                    <router-link to="/Contestlist" class="nav-link">Contest</router-link>
                </li>
                <li class="navbar-item">
                    <router-link to="/Graph" class="nav-link">Graph</router-link>
                </li>
            </ul>
            
        </div>
        
        <!-- Show user info if logged in, otherwise show login button -->
        <div v-if="isLoggedIn" class="user-section">
            <span class="username">Welcome, {{ username }}!</span>
            <button class="button logout-btn" @click="logout">Logout</button>
        </div>
        <button v-else class="button" @click="login">Login</button>
        </nav>
        
        
    <!-- </div> -->
</template>

<style scoped>


nav {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #006699;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  text-align: center;
  align-items: center;
}

.create{
        background-color: #007bff00;
        color: rgb(51, 255, 0);
        border: none;
        border-radius: 4px;
        border-color: green;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        margin-left: auto;
    }

.button {
    padding: 1px 6px;
    color: #ffffffcd;
    font-weight: bold;
    margin-right: 1%;
    text-decoration: none;
    float: right;
}

.navbar-center {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.navbar-nav {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.navbar-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.navbar-item {
  margin: 0 20px;
  
}

.nav-link {
  text-decoration: none;
  color: #ffffffcd;
  font-weight: normal;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: medium
}

.contest {
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  text-align: center;
  font-size: x-large;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 10px;
}

.title {
  text-decoration: none;
  color: #fffffffa;
  font-weight: bold;
  text-align: center;
  font-size: x-large;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 10px;
}

.contest:hover,
.nav-link:hover {
  text-decoration: wavy;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  color: #ffffffcd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: medium;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
