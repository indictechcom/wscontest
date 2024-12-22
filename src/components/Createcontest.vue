<template>
  <div class="create-contest">
    <h2>Create Contest</h2>
    <hr />
    <br />
    <h3>Contest Name</h3>
    <input v-model="contestInfo" type="text" />

    <h3>Language (ISO Code)</h3>
    <input v-model="contestLang" type="text" maxlength="3" />

    <div class="section">
      <div class="input-group">
        <h3>Start date</h3>
        <input v-model="startDate" type="date" />

        <h3>Index pages</h3>
        <textarea v-model="indexPages" rows="5"></textarea><br>
        <div class="button-container">
          <button 
            :disabled="pageValidation" 
            @click="validateIndex"
            :class="{'validate': true, 'validate-green': pageValidationPass.value}"
          >
            <span v-if="pageValidation" class="loader"></span>
            <span v-else>Validate</span>
          </button>
        </div>
        <p v-if="invalidPageList.length > 0" style="color: red;"><b>Invalid pages:</b></p>
        <div v-for="pageName in invalidPageList" :key="pageName" class="index-item">
          <span><p :class="missing-page">{{ pageName }}</p></span>
        </div>
      </div>
      <div class="input-group">
        <h3>End date</h3>
        <input v-model="endDate" type="date" />
      </div>
    </div>

    <div class="mb-3">
      <label for="multi-select" class="block text-sm font-medium text-gray-700">Select admins</label>
      <!-- Vue-Multiselect Component -->
      <multiselect
        v-model="selectedAdmins"
        :options="admins"
        :multiple="true"
        placeholder="Select admins"
        class="mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        track-by="id"
        label="label"
        :searchable="true"
        @search-change="onSearch"
      />
    </div>

    <br />
    <h2>Scoring system</h2>
    <div class="section">
      <div class="input-group">
        <h3>Action taken</h3>
        <br />
        <h3>From any status to Proofread</h3>
        <br />
        <h3>From Proofread to Validate</h3>
        <br />
        <div class="button-container">
          <button class="create" @click="post">Create</button>
          <p v-if="isAlertVisible.value">{{ alertMessage.value }}</p>
        </div>
      </div>

      <div class="input-group">
        <h3>Points</h3>
        <input v-model="stov" type="text" />
        <input v-model="vtop" type="text" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import globals from "../globals.js";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import jsonp from 'jsonp';

let isAlertVisible = ref(false);
let alertMessage = ref("");
const contestInfo = ref("");
const contestLang = ref("");
const startDate = ref("");
const indexPages = ref("");
const endDate = ref("");
const stov = ref("");
const vtop = ref("");
let pageValidation = ref(false);
const selectedAdmins = ref([]); // Use ref for reactivity
const admins = ref([]); // Empty array for options, to be updated dynamically
// Debounce variables
let debounceTimer = null;
let indexPageList = ref([]);
let invalidPageList = ref([]);
let pageValidationPass = ref(false);

// API call to get dynamic options based on input
const fetchOptions = async (query) => {
  try {
    jsonp(`${globals.WIKIPEDIA_API_URL}?action=query&format=json&list=allusers&auprefix=${query}`, null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        const resultData = data.query.allusers
        admins.value = resultData.map((item, index) => (
          {
          id: item.userid, // Unique ID for each item
          label: item.name, // The label to display in the multiselect dropdown
        }));
      }
    });
  } catch (error) {
    console.error("Error fetching options:", error);
  }
};
// Handle search input and make API call after debounce
const onSearch = (searchTerm) => {
  // Clear the previous timeout
  if (debounceTimer) clearTimeout(debounceTimer);

  // Set a new timeout for the API call (debounce effect)
  debounceTimer = setTimeout(() => {
    if (searchTerm) {
      fetchOptions(searchTerm); // Only fetch if there's a search term
    }
  }, 300); // 300ms debounce delay
};


const validateIndex = () => {
  pageValidation.value = true;
  const indexPageContent = indexPages.value.split("\n").map(page => page.trim()).filter(Boolean);
  const jsonpPromises = []; // Array to store promises
  invalidPageList.value = [];

  for (let i = 0; i < indexPageContent.length; i++) {
    const pageName = indexPageContent[i];
    // Wrap JSONP call in a promise
    const promise = new Promise((resolve, reject) => {
      jsonp(`${globals.WIKISOURCE_API_URL}?action=query&format=json&prop=revisions&titles=${pageName}&formatversion=2&rvprop=&rvslots=`, null, function (err, data) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const missing = data.query.pages[0].missing ? true : false;
          if (missing) {
            invalidPageList.value.push(pageName);
          }
          else {
            indexPageList.value.push(pageName);
          }
          resolve();
        }
      });
    });

    jsonpPromises.push(promise);
  }
};
// Handle search input and make API call after debounce
const onSearch = (searchTerm) => {
  // Clear the previous timeout
  if (debounceTimer) clearTimeout(debounceTimer);
  // Wait for all JSONP calls to complete
  Promise.all(jsonpPromises)
    .then(() => {
      pageValidation.value = false;
      if (invalidPageList.value.length == 0) {
        pageValidationPass.value = true;
      } else {
        pageValidationPass.value = false;  // Disable "Create" button if there are invalid pages
      }
    })
    .catch((error) => {
      console.error("Error during JSONP requests:", error);
      pageValidation.value = false;
      pageValidationPass.value = false
    });
  // Set a new timeout for the API call (debounce effect)
  debounceTimer = setTimeout(() => {
    if (searchTerm) {
      fetchOptions(searchTerm); // Only fetch if there's a search term
    }
  }, 300); // 300ms debounce delay
};

// Post request function
const post = async () => {
  const adminUsernames = selectedAdmins.value.map(admin => admin.label);
  console.log("Selected admins:", adminUsernames);
  try {
    if (invalidPageList.value.length > 0 || indexPageList.value.length == 0) {
      console.error("Invalid pages found, please validate the index pages first.");
      if ((invalidPageList.value.length > 0)) {
        alertMessage.value = `Invalid pages: ${invalidPageList.value.join(', ')}`;
        isAlertVisible.value = true;
        return; // Stop further execution if invalid pages exist
      }
      return;
    }
    const response = await axios.post(
      globals.API_URL + "/contest/create",
      {
        name: contestInfo.value,
        language: contestLang.value,
        start_date: startDate.value,
        book_names: indexPages.value,
        end_date: endDate.value,
        admins: adminUsernames, // Send selected admins
        proofread_points: stov.value,
        validate_points: vtop.value, // Send selected options
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from API:", response.data);
  } catch (error) {
    console.error("Error creating contest:", error);
  }
};
</script>

<style scoped>

button {
  background-color: #f89500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:disabled {
  background-color: #ccc; /* Disabled button color */
  cursor: not-allowed;
}

.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.create-contest {
  margin-top: 7.5rem;
  color: black;
  padding: 5rem 0;
}

h2 {
  margin-bottom: 10px;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  font-size: 24px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.create {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
}

.validate {
  background-color: #f89500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
}

.validate-green {
  background-color: #28a745; /* Green color when validation passes */
}

.missing-page {
  color: red;
  font-style: bold;
}

.input-group {
  flex: 1;
  margin-right: 10px;
}

@media (min-width: 768px) {
  input {
    width: 80%;
    max-width: 800px;
  }
}
</style>
