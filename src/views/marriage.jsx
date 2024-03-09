import React, { useState, useRef } from "react";
import TableComponent from "../components/TableComponent"; // Adjust the import path as necessary
import PieChart from "../components/PieChart"; // Adjust the import path as necessary
import processExcelFile from "../utils/Map"; // Adjust the import path as necessary

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const fileInputRef = useRef(null);

  const handleClickButton = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await processExcelFile(file);
        setData(result.mappedData);
        // Calculate the total number of filled cells in the first column
        const totalItems = result.mappedData.filter(
          (item) => item.column1
        ).length;
        setCount(result.count);
        setTotalItems(totalItems);
        const investigateEntries = result.mappedData.filter(
          (item) => item.column2 === "Investigate"
        ).length;
        setInvestigate(investigateEntries);
        // Update the state with the calculated total
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const [totalItems, setTotalItems] = useState(0);
  const [investigate, setInvestigate] = useState(0);
  const highlightCount = count;
  const rest = totalItems - (count + investigate);

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <button
        onClick={handleClickButton}
        className="bg-teal-400 text-white w-[150px] h-[40px] rounded-md hover:bg-[#C7C7C7]"
      >
        Select Excel File
      </button>
      <p>
        Count of cases where column 2 is "PASS" and column 3 is "YES": {count}
      </p>
      <p>Investigate Count = {investigate}</p>
      <div className="flex">
        <div className="w-1/2 overflow-auto h-96">
          {" "}
          {/* Adjust the height as needed */}
          <TableComponent data={data} />
        </div>
        <div className="w-1/2">
          <PieChart
            totalItems={rest}
            highlightCount={highlightCount}
            investigateCount={investigate}
          />
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;
