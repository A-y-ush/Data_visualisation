import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartComp = ({ data, labels }) => {
  // Assuming data is structured as [xData, yData]
  const chartData = {
    labels: data[0], // Use the xData as labels
    datasets: [
      {
        label: "Data",
        data: data[1], // Use the yData as data points
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ChartComp;
