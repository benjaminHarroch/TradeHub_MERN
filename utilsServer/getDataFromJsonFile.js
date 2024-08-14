const fs = require('fs').promises;
const GetSymboleToJsonFile =require('./GetSymbols');

// Define the path to the JSON file
const filePath = './symbols.json';

//GetSymboleToJsonFile();


 const getDataFromJsonFile = async ()=>{

    try{
            // Read the JSON file
        const data =await fs.readFile(filePath, 'utf8')
        

            // Parse the JSON data
        const jsonData = JSON.parse(data);
        
        // Output the parsed JSON data
        console.log('JSON Data:', jsonData);
        return jsonData.symbols;
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
};


module.exports =getDataFromJsonFile;
