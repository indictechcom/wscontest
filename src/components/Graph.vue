
 <template>
    <div class="graph-container">
      <div class="input-container">
        
        <select v-model="selectedField" @change="fetch" class="form-control">
        <option disabled value="">Select a field</option>
        <option v-for="(field, index) in dropdownfields" :key="index" :value="field.id">
          {{ field.name }}
        </option>
        </select>

        <button @click="generateGraph">Get Graph</button>
      </div>
      <div class="instr">
        <p>All contests ID sepreated by | eg. 2|3</p>
        <br>
      </div>
      <div style="width: 800px;"><canvas id="graph"></canvas></div>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'GraphComponent',
    data() {
      return {
        graphTitle: 'Contest graph',
        xValues: [0, 1, 2, 3, 4, 5],
        yValues: [0, 10, 5, 2, 20, 30],
        xTitle: 'Contests',
        yTitle: 'Score',
        // barColors: ref([]),
        // chart: null,
        // dropdownfields: ref([]),
        // selection: null
        chartInstance: null,
      };
    },//ok

    
  async mounted () {
    const response = await axios.get('');
    this.dropdownfields = response.data;

    

  },//ok

  methods: {

        fetch: async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/');
    // xValues.value = response.data.map(item => item.label);
    // yValues.value = response.data.map(item => item.value);
    
    // generateGraph();

    this.xValues = response.data.map(item => item.label);
    this.yValues = response.data.map(item => item.value);
        
    this.generateGraph();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},


      generateGraph(){
        const ctx = document.getElementById('graph').getContext('2d');

        if (this.chartInstance) {
        this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.xValues,
            datasets: [{
              label: this.graphTitle,
              data: this.yValues,
              borderColor: 'rgba(24, 134, 234, 0.41)',
              backgroundColor: 'rgba(24, 134, 234, 0.41)',
              fill: true,
              tension: 0.1
            }]
          },

          options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: this.xTitle
              }
            },
            y: {
              title: {
                display: true,
                text: this.yTitle
              }
            }
          },
            plugins: {
              title: {
                display: false,
              },
              legend: false,
            }
          }

        })

      }
    }
  };
  </script>
  
  <style scoped>
  .graph-container {
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    background-color: white;
    padding: 60px;
    width: 100%;
    box-sizing: border-box;
  }

  .instr{
    color: #555;
    font-weight: lighter;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    text-wrap: nowrap;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .chart-canvas {
    width: 100%;
    max-width: 1000px;
    height: 500px;
  }


select.form-control {
padding: 10px;
margin-right: 10px;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 16px;
width: 100%; /* Automatically adjusts width based on content */
  max-width: 400px;
background-color: white; /* Background color */
color: #555; /* Text color */
}

select.form-control:focus {
  outline: none; /* Remove outline on focus */
  border-color: #007bff; /* Change border color on focus */
}
  </style>
  
                                          
 