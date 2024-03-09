import React, { useRef } from "react";
import * as XLSX from "xlsx";

const ExcelFileInput = ({ onFileLoaded }) => {
  // Corrected prop name here
  const fileInputRef = useRef(null);

  const handleClickButton = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      onFileLoaded(jsonData); // Now correctly refers to the prop
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex justify-center items-center ">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        onClick={handleClickButton}
        className="bg-teal-400 text-white w-[150px] h-[40px] rounded-md"
      >
        Select Excel File
      </button>
    </div>
  );
};

export default ExcelFileInput;
