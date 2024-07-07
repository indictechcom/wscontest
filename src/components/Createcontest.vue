   <template>
    <div class="create-contest">
      <h2>Create Contest</h2>
      <br>
      <hr />
      <br>
      <h3>Basic Info</h3>
      <input v-model="contestInfo" type="text" >
      <h3>Language</h3>
      <input v-model="contestLang" type="text" maxlength="3" >

      <div class="section">
      <div class="input-group">
        <h3>Start date</h3>
        <input v-model="startDate" type="date" >
        <h3>Index pages</h3>
        <textarea v-model="indexPages" rows="5"></textarea>
      </div>
      <div class="input-group">
        <h3>End date</h3>
        <input v-model="endDate" type="date" >
        <h3>Admins</h3>
        <textarea v-model="admins" rows="5"></textarea>
      </div>

      

    </div>
    <h2>Scoring system</h2>
    <div class="section">
      <div class="input-group">
        <h3>Action taken</h3>
        <br>
        <h3>From any status to Proofread</h3>
        <br>
        <h3>From Proofread to Validate</h3>
        <br>
        <button class="create" @click="post">Create</button>
      </div>
      <div class="input-group">
        <h3>Points</h3>
        <input v-model="stov" type="text" >
        <input v-model="vtop" type="text" >
      </div>


    </div>
    </div>
  </template>
  
  <script setup>
  import  axios  from 'axios';
  import { ref } from 'vue';
  
    const contestInfo = ref('');
    const contestLang = ref('');
    const startDate = ref('');
    const indexPages = ref('');
    const endDate = ref('');
    const admins = ref('');
    const stov = ref('');
    const vtop = ref('');

    const post = async () => {
        try {
            const response = await axios.post('http://192.168.239.1:5000/contest/create', {
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
              withCredentials: true ,headers: {
                'Content-Type': 'application/json'
              }
            }
          );
            
            console.log('Response from API:', response.data);
        } catch (error) {
            console.error('Error creating contest:', error);
        }
    };
  </script>
  
  <style scoped>
  .create-contest {
    padding-top: 70px;
    color: black
  }

  
  
  input,textarea{
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.section {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.create{
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
  
