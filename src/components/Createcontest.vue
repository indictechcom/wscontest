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
        <textarea v-model="indexPages" rows="5"></textarea>
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

// Reactive variables for form data
const contestInfo = ref("");
const contestLang = ref("");
const startDate = ref("");
const indexPages = ref("");
const endDate = ref("");
const stov = ref("");
const vtop = ref("");
const selectedAdmins = ref([]); // Use ref for reactivity
const admins = ref([]); // Empty array for options, to be updated dynamically
// Debounce variables
let debounceTimer = null;

// API call to get dynamic options based on input
const fetchOptions = async (query) => {
  try {
    jsonp(`${globals.USER_API_URL}?action=query&format=json&list=allusers&auprefix=${query}`, null, function (err, data) {
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

// Post request function
const post = async () => {
  const adminUsernames = selectedAdmins.value.map(admin => admin.label);
  try {
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
