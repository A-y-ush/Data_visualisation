import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Bar } from "react-chartjs-2";
// import XLSX from "xlsx";
import * as XLSX from "xlsx";
const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const processData = (data) => {
    // Assuming the first row contains headers and the rest are data rows
    const headers = data[0];
    const rows = data.slice(1);

    // Convert rows to objects for easier manipulation
    const processedRows = rows.map((row) => {
      const obj = {};
      row.forEach((cell, index) => {
        obj[headers[index]] = cell;
      });
      return obj;
    });

    // Example: Using the first column for the chart and all columns for the table
    const chartLabels = processedRows.map((row) => row[headers[0]]);
    const chartValues = processedRows.map((row) => row[headers[1]]); // Assuming the second column is numeric

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Data",
          data: chartValues,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });

    setTableData(processedRows);
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Category",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {chartData && (
        <div>
          <h2>Bar Chart</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
      {tableData.length > 0 && (
        <div>
          <h2>Table</h2>
          <table>
            <thead>
              <tr>
                {tableData[0] &&
                  Object.keys(tableData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
