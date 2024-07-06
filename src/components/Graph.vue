<!-- <template>
    <div>
      <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    name: 'Graph',
    data() {
      return {
        xValues: ["Italy", "France", "Spain", "USA", "Argentina"],
        yValues: [55, 49, 44, 24, 15],
        barColors: ["red", "green", "blue", "orange", "brown"]
      };
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        new Chart(document.getElementById("myChart"), {
          type: "bar",
          data: {
            labels: this.xValues,
            datasets: [{
              backgroundColor: this.barColors,
              data: this.yValues
            }]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: "World Wine Production 2018"
            }
          }
        });
      }
    }
  };
  </script> -->
  





<!-- <template>
    <div>
    <canvas id="myChart" style="width:70%;max-width:700px"></canvas>
    </div>
</template>

<script>
src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"
export default {

  name: 'Graph',
    
    data(){
        return{
            xValues: ["Italy", "France", "Spain", "USA", "Argentina"],
            yValues: [55, 49, 44, 24, 15],
            barColors: ["red", "green", "blue", "orange", "brown"]
        }
    },
    mounted() {
        this.createChart();
    },

    methods: {
        createchart(){
            new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
        display: true,
        text: "World Wine Production 2018"
        }
    }
    });
        }
    }


}
</script> -->

<!-- <template>
    <div class="graph-container">
      <input v-model="graphTitle" type="text" placeholder="Enter graph title" />
      <button @click="generateGraph">Get Graph</button>
      <canvas id="myChart" style="width:70%;max-width:700px; margin-top: 20px;"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  
  export default {
    name: 'Graph',
    data() {
      return {
        graphTitle: '',
        xValues: ["Italy", "France", "Spain", "USA", "Argentina"],
        yValues: [55, 49, 44, 24, 15],
        barColors: ["red", "green", "blue", "orange", "brown"],
        chart: null
      };
    },
    methods: {
      generateGraph() {
        if (this.chart) {
          this.chart.destroy(); // Destroy the existing chart before creating a new one
        }
        this.chart = new Chart(document.getElementById("myChart"), {
          type: "bar",
          data: {
            labels: this.xValues,
            datasets: [{
              backgroundColor: this.barColors,
              data: this.yValues
            }]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: this.graphTitle || 'World Wine Production 2018'
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .graph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
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
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style> -->
  
 <template>
    <div class="graph-container">
      <div class="input-container">
        <input v-model="graphTitle" type="text" placeholder="Enter graph title" />
        <button @click="fetch">Get Graph</button>
      </div>
      <div class="instr">
        <p>All contests ID sepreated by | eg. 2|3</p>
      </div>
      <canvas id="myChart" class="chart-canvas"></canvas>
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
        graphTitle: '',
        xValues: ref([]),
        yValues: ref([]),
        barColors: ref([]),
        chart: null
      };
    },

    

    methods: {

        fetch: async () => {
  try {
    const response = await axios.get('endpoint');
    xValues.value = response.data.map(item => item.label);
    yValues.value = response.data.map(item => item.value);
    
    generateGraph();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},

      generateGraph() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(document.getElementById("myChart"), {
          type: "bar",
          data: {
            labels: this.xValues,
            datasets: [{
              backgroundColor: this.barColors,
              data: this.yValues
            }]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: this.graphTitle || 'World Wine Production 2018'
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .graph-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
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
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .chart-canvas {
    width: 100%;
    max-width: 1000px;
    height: 500px;
  }
  </style>
  
                                          
  <!-- <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { Chart } from 'chart.js/auto';
  
  const graphTitle = ref('');
  const xValues = ref([]);
  const yValues = ref([]);
  const barColors = ["red", "green", "blue", "orange", "brown"];
  let chart = null;
  
  const fetchDataAndGenerateGraph = async () => {
    try {
      const response = await axios.get('your_api_endpoint_here');
      xValues.value = response.data.map(item => item.label);
      yValues.value = response.data.map(item => item.value);
      
      generateGraph();
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (show error message, etc.)
    }
  };
  
  const generateGraph = () => {
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(document.getElementById("myChart"), {
      type: "bar",
      data: {
        labels: xValues.value,
        datasets: [{
          backgroundColor: barColors,
          data: yValues.value
        }]
      },
      options: {
        legend: { display: false },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: graphTitle.value || 'World Wine Production 2018'
          }
        }
      }
    });
  };
  </script> -->