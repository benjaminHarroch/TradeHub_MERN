const fs = require('fs');

function GetSymboleToJsonFile(){

// Read the .txt file
fs.readFile('./utilsServer/NASDAQ.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

     // Split the data into lines
     const lines = data.trim().split('\n');

     console.log(lines);

     // Extract symbols from each line
     const symbols = lines.map(line => {
         const parts = line.split(' '); // Change to '\t' if your file uses tabs
         return parts[0].toUpperCase(); // Extract the symbol and convert to uppercase
     });

     // Format as JSON
     const jsonOutput = JSON.stringify({ symbols: symbols }, null, 2);

    // Write the JSON data to a file
    fs.writeFile('symbols.json', jsonOutput, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON file has been saved.');
    });
});
}

module.exports =GetSymboleToJsonFile;