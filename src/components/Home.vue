<!-- <template>
  <div>
    <h2>Indic Wikisource Contest Tool</h2>
    <p>
      This tool is used to evaluate the proofreading and validation of a contest.
    </p>
  </div>
  <img src="../assets/Wikisource-logo.svg" class="logo">
</template>



<style scoped>
  h2 {
    color: #000000;
  }

  p {
    font-size: 18px; 
    line-height: 1.6; 
  }

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
</style>


<script>
export default {
  name: 'Home'
}
</script> -->

<template>
  <div class="container">
    <div class="content">
      <img src="../assets/Wikisource-logo.svg" alt="Description" class="center-image" />
      <p class="description">This is some text below the image.</p>
    </div>
  </div>
</template>



<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  height: 100vh; /* Full height */
}

.content {
  text-align: center; /* Center text below the image */
}

.center-image {
  max-width: 100%; /* Responsive image */
  height: auto;
  margin: 0 auto; /* Center the image */
}

.description {
  margin-top: 20px; /* Space between image and text */
}
</style>
