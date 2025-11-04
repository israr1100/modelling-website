const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const EXCEL_FILE = 'registrations.xlsx';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function initializeExcel() {
  if (!fs.existsSync(EXCEL_FILE)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['Submission Date', 'Full Name', 'Email', 'Phone', 'Gender', 'Address']
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    XLSX.writeFile(wb, EXCEL_FILE);
    console.log('Excel file created!');
  }
}

function saveToExcel(data) {
  try {
    const wb = XLSX.readFile(EXCEL_FILE);
    const ws = wb.Sheets['Registrations'];
    const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
    
    const newRow = [
      new Date().toLocaleString(),
      data.fullName,
      data.email,
      data.phone,
      data.gender,
      data.address
    ];
    jsonData.push(newRow);
    
    const newWs = XLSX.utils.aoa_to_sheet(jsonData);
    wb.Sheets['Registrations'] = newWs;
    XLSX.writeFile(wb, EXCEL_FILE);
    return true;
  } catch (error) {
    console.error('Error saving to Excel:', error);
    return false;
  }
}

app.post('/api/submit', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  
  const success = saveToExcel(formData);
  
  if (success) {
    res.json({ success: true, message: 'Registration saved successfully!' });
  } else {
    res.status(500).json({ success: false, message: 'Error saving registration' });
  }
});

app.listen(PORT, () => {
  initializeExcel();
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📊 Excel file: ${EXCEL_FILE}`);
});