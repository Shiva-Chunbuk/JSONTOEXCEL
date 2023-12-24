const fs = require('fs');
const xlsx = require('xlsx');

const filePath = 'sample.json';
const outputExcelFile = 'output.xlsx';

fs.promises.readFile(filePath, 'utf-8')
    .then(data => JSON.parse(data))
    .then(data => {
        writeDataToExcel(data, outputExcelFile);
    })
    .catch(error => console.error('Error reading or parsing the file:', error));

function writeDataToExcel(data, outputFile) {
    const ws = xlsx.utils.json_to_sheet(data.countries);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Countries');
    xlsx.writeFile(wb, outputFile);

    console.log(`Data has been written to ${outputFile}`);
}

