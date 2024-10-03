<template>
  <div>
    <!-- Render the ECharts bar chart -->
    <div id="chart" style="width: 100%; height: 400px"></div>

    <!-- Render the average score as a circular chart -->
    <div
      id="average"
      style="width: 200px; height: 200px; margin: 20px auto"
    ></div>
  </div>
  <div>
    <!-- Present reason and proposal for each criterion inside expandable/collapsible cards -->
    <div v-for="(item, index) in criteria" :key="index" class="card">
      <div
        class="card-header"
        @click="toggleCard(index)"
        style="cursor: pointer"
      >
        <h3>{{ item.name }}</h3>
      </div>
      <!-- Conditional rendering of reason and proposal when the card is expanded -->
      <div v-if="expandedIndex === index" class="card-body">
        <p><strong>Reason:</strong> {{ item.reason }}</p>
        <p><strong>Proposal:</strong> {{ item.proposal }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// Import the JSON data directly from the assets folder
import statisticsData from "~/assets/statistics.json";

// Reactive variable to hold the JSON data
const criteria = ref(statisticsData.criteria);

// Function to initialize the bar chart
function initializeChart() {
  const chartDom = document.getElementById("chart");
  const myChart = echarts.init(chartDom);

  // Prepare dataset by mapping the score to both "score" and "amount"
  const dataset = criteria.value.map((item) => [
    item.score,
    item.score,
    item.name,
  ]);

  const option = {
    dataset: {
      source: [
        ["score", "amount", "product"],
        ...dataset, // Add the score for both amount and score, and name as product
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: { type: "category" },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 10,
      max: 100,
      text: ["High Score", "Low Score"],
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          x: "amount",
          y: "product",
        },
      },
    ],
  };

  myChart.setOption(option); // Apply the options to the chart
}

// Function to initialize the circular average score chart
function initializeAverageChart() {
  const totalScore = criteria.value.reduce((sum, item) => sum + item.score, 0); // Calculate total score
  const averageScore = totalScore / criteria.value.length; // Calculate average score

  const chartDom = document.getElementById("average");
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: `${averageScore}%`,
      left: "center",
      top: "center",
      textStyle: {
        fontSize: 24,
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Average Score",
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          {
            value: averageScore,
            name: "Average",
            itemStyle: { color: "#FD665F" },
          },
          {
            value: 100 - averageScore,
            name: "Remaining",
            itemStyle: { color: "#FFCE34" },
          },
        ],
      },
    ],
  };

  myChart.setOption(option); // Apply the circular chart options
}

// Initialize the charts when the component is mounted
onMounted(() => {
  initializeChart(); // Initialize the bar chart with the imported data
  initializeAverageChart(); // Initialize the average score circular chart
});

// Reactive variable to track which card is expanded (initialized as null)
const expandedIndex = ref(null);

// Function to toggle the visibility of the card body
function toggleCard(index) {
  // If the clicked card is already expanded, collapse it, otherwise expand it
  expandedIndex.value = expandedIndex.value === index ? null : index;
}
</script>

<style scoped>
.card {
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 8px 8px 0 0;
  font-size: 18px;
}

.card-body {
  padding: 10px;
  font-size: 16px;
}
</style>
