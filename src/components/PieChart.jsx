import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ totalItems, highlightCount, investigateCount }) => {
  const data = {
    labels: ["Others", "Highlighted Count", "Investigate Count"],
    datasets: [
      {
        data: [totalItems, highlightCount, investigateCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart Example",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
