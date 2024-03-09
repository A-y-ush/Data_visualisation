import * as XLSX from "xlsx";

const processExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const bstr = ev.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let count = 0;
      const mappedData = data.map((row) => {
        // Check if column 2 has "PASS" and column 3 has "YES"
        if (row[1] === "Pass" && row[25] === "Yes") {
          count++;
        }
        return {
          column1: row[0], // Assuming you want to map the first column
          column2: row[1], // Assuming you want to map the second column
          column3: row[25], // Assuming you want to map the third column
        };
      });
      resolve({ mappedData, count });
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

export default processExcelFile;
