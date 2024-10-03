<template>
  <div>
    <!-- Chart container where the ECharts chart will be rendered -->
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// Import the JSON data directly from the assets folder
import statisticsData from "~/assets/statistics.json";

// Reactive variable to hold the JSON data
const criteria = ref(statisticsData.criteria); // Directly assign data from JSON

// Function to initialize the chart with the imported data
function initializeChart() {
  const chartDom = document.getElementById("chart"); // Get the chart DOM element
  const myChart = echarts.init(chartDom); // Initialize ECharts instance

  // Prepare dataset by mapping the score and name from the JSON data
  const dataset = criteria.value.map((item) => [
    item.score,
    item.score,
    item.name,
  ]);

  // ECharts options for the bar chart
  const option = {
    dataset: {
      source: [["score", "amount", "product"], ...dataset],
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

// Initialize the chart when the component is mounted
onMounted(() => {
  initializeChart(); // Initialize the chart with the imported data
});
</script>

<style scoped></style>
