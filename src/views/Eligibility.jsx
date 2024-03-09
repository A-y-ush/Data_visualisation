import React, { useState } from "react";
import ExcelFileInput from "../components/ExcelFileInput";
import ChartComp from "../components/ChartComp";

const Eligibility = () => {
 const [data, setData] = useState([]);
 const [labels, setLabels] = useState([]);
 const [selectedColumns, setSelectedColumns] = useState([null, null]);
 const [jsonData, setJsonData] = useState([]); // New state variable to store jsonData

 const handleFileLoaded = (jsonData) => {
    setJsonData(jsonData); // Store the jsonData in state
    const columns = Object.keys(jsonData[0]);
    setLabels(columns);
    setSelectedColumns([columns[0], columns[1]]);
    setData([
      jsonData.map((item) => item[columns[0]]),
      jsonData.map((item) => item[columns[1]]),
    ]);
 };

 const handleColumnChange = (index, event) => {
    const newSelectedColumns = [...selectedColumns];
    newSelectedColumns[index] = event.target.value;
    setSelectedColumns(newSelectedColumns);
   
    // Ensure jsonData is not empty and contains the selected columns
    if (jsonData.length > 0 && newSelectedColumns.every(column => column)) {
       // Update data based on the new selected columns
       const updatedData = [
         jsonData.map((item) => item[newSelectedColumns[0]]),
         jsonData.map((item) => item[newSelectedColumns[1]]),
       ];
       setData(updatedData);
    }
   };
   
   

 return (
    <div>
      <ExcelFileInput onFileLoaded={handleFileLoaded} />
      {labels.length > 0 && (
        <div>
          <select value={selectedColumns[0]} onChange={(e) => handleColumnChange(0, e)}>
            {labels.map((label, index) => (
              <option key={index} value={label}>{label}</option>
            ))}
          </select>
          <select value={selectedColumns[1]} onChange={(e) => handleColumnChange(1, e)}>
            {labels.map((label, index) => (
              <option key={index} value={label}>{label}</option>
            ))}
          </select>
        </div>
      )}
      {data.length > 0 && <ChartComp data={data} labels={labels} />}
    </div>
 );
};

export default Eligibility;
