

<template>
    <!-- <div id="navigation"> -->
        <nav class="navbar">
        <a class="contest" href="#">Wikisource contest</a>
        <div class="navbar-nav">
            <ul class="navbar-items">
                <li class="navbar-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="navbar-item">
                    <router-link to="/Contest" class="nav-link">Contest</router-link>
                </li>
                <li class="navbar-item">
                    <router-link to="/Graph" class="nav-link">Graph</router-link>
                </li>
            </ul>
        </div>
        </nav>
        <router-view></router-view>
    <!-- </div> -->
    
</template>

<style scoped>

/* #navigation{
    width: 100%;
    min-width: 100vw;
    background-color: white;
    min-height: 100vh;
    padding-top: 60px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
} */

nav {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #fafa0c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  text-align: center;
  align-items: center;
}

.navbar-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  color: #000000cd;
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

.contest:hover,
.nav-link:hover {
  text-decoration: wavy;
}
</style>