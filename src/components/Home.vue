<template>
  <div class="container">
    <div class="content">
      <img src="../assets/Wikisource-logo.svg" alt="Description" class="center-image" />
      <blockquote class="description">Wikisource contest tool helps you to consolidate data of various contests conducted by wikisource. The tool allows to assign admins, monitor contests, give points etc.</blockquote>
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
  max-width: 80%; /* Responsive image */
  height: auto;
  margin: 0 auto; /* Center the image */
}

.description {
  margin-top: 20px;
  padding: 20px; /* Adds padding around the text */
  font-size: 1.1rem; /* Slightly larger font */
  font-style: italic; /* Italic text to differentiate blockquote */
  line-height: 1.8; /* Improves readability */
  color: #333; /* Dark gray for a softer look */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  max-width: 60%;
  text-align: center; /* Centers the text */
  margin: 0 auto;
}
</style>
