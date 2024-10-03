<template>
  <div>
    <!-- Chart container where the ECharts chart will be rendered -->
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

// onMounted: This lifecycle hook runs after the component is mounted to the DOM
onMounted(() => {
  const chartDom = document.getElementById("chart"); // Get the chart container
  const myChart = echarts.init(chartDom); // Initialize ECharts

  const option = {
    dataset: {
      source: [
        ["score", "amount", "product"],
        [89.3, 58212, "Matcha Latte"],
        [57.1, 78254, "Milk Tea"],
        [74.4, 41032, "Cheese Cocoa"],
        [50.1, 12755, "Cheese Brownie"],
        [89.7, 20145, "Matcha Cocoa"],
        [68.1, 79146, "Tea"],
        [19.6, 91852, "Orange Juice"],
        [10.6, 101852, "Lemon Juice"],
        [32.7, 20112, "Walnut Brownie"],
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
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#65B581", "#FFCE34", "#FD665F"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
        },
      },
    ],
  };

  // Apply the options to the chart
  myChart.setOption(option);
});
</script>

<style scoped></style>
