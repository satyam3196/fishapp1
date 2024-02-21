const axios = require('axios');
const XLSX = require('xlsx');

exports.handler = async (event, context) => {
    try {
        // URL to the raw Excel file
        const excelUrl = 'https://raw.githubusercontent.com/satyam3196/fishapp1/40fe5fa2658b31e8fd36b8b3d533311a0f3a9590/data1.xlsx';

        // Fetch the Excel file
        const response = await axios.get(excelUrl, {
            responseType: 'arraybuffer' // Important for binary files like Excel
        });

        // Convert the fetched data to a workbook
        const workbook = XLSX.read(response.data, {
            type: 'buffer'
        });

        // Convert the first worksheet to JSON
        const worksheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const worksheet = workbook.Sheets[worksheetName];
        const result = XLSX.utils.sheet_to_json(worksheet, {
            header: 1, // Treats the first row as headers
            defval: '' // Sets undefined cells to empty strings
        });

        // Convert array of arrays (result) to a format suitable for your application
        // Assuming the first row contains column headers
        const jsonResult = result.slice(1).map(row => {
            return {
                Article: row[0], // Maps the first column to "Article"
                Description: row[1], // Maps the second column to "Description"
                Implications: row[2] // Maps the third column to "Implications"
            };
        });

        // Retrieves the article query without altering its case
        const articleQuery = event.queryStringParameters.article;

        // Searches for an exact match in the converted JSON
        const articleData = jsonResult.find(row =>
            row.Article === articleQuery
        );

        // Logs for debugging purposes
        console.log("Received article query:", articleQuery);
        console.log("Available Articles:", jsonResult.map(row => row.Article));

        if (articleData) {
            console.log("Found Article Data:", articleData);
            return {
                statusCode: 200,
                body: JSON.stringify(articleData)
            };
        } else {
            console.log("Article Not Found:", articleQuery);
            return {
                statusCode: 404,
                body: "Article not found"
            };
        }
    } catch (error) {
        console.error("Error in function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};










/*
const { readFileSync } = require('fs');
//const path = require('path');
const excelToJson = require('convert-excel-to-json');

exports.handler = async (event, context) => {
    try {
        // Adjust the file path according to your project structure
        const filePath ='https://github.com/satyam3196/fishapp1/blob/40fe5fa2658b31e8fd36b8b3d533311a0f3a9590/data1.xlsx';
        const result = excelToJson({
            source: readFileSync(filePath),
            header: {
                rows: 1 // Assumes the first row contains column headers
            },
            columnToKey: {
                A: 'Article', // Maps the first column to "Article"
                B: 'Description', // Maps the second column to "Description"
                C: 'Implications' // Maps the third column to "Implications"
            }
        });

        // Retrieves the article query without altering its case
        const articleQuery = event.queryStringParameters.article; 

        // Searches for an exact match in the converted JSON
        const articleData = result.Sheet1.find(row => 
            row.Article === articleQuery
        );

        // Logs for debugging purposes
        console.log("Received article query:", articleQuery);
        console.log("Available Articles:", result.Sheet1.map(row => row.Article));

        if (articleData) {
            console.log("Found Article Data:", articleData);
            return {
                statusCode: 200,
                body: JSON.stringify(articleData)
            };
        } else {
            console.log("Article Not Found:", articleQuery);
            return {
                statusCode: 404,
                body: "Article not found"
            };
        }
    } catch (error) {
        console.error("Error in function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};










const axios = require('axios');
const excelToJson = require('convert-excel-to-json');

exports.handler = async (event, context) => {
    try {
        // Replace 'yourdomain.com' with your actual domain.
        // If you haven't set up a custom domain, use your Netlify subdomain, e.g., 'your-site-name.netlify.app'.
        // Ensure the path correctly points to where your file is accessible after deployment.
        const excelFileUrl = '/frontend/data1.xlsx';

        // Fetch the Excel file content using axios
        const response = await axios({
            url: excelFileUrl,
            method: 'GET',
            responseType: 'arraybuffer' // Important for binary files like Excel
        });

        // Convert the Excel file to JSON
        const result = excelToJson({
            source: response.data, // Use the fetched data
            header: {
                rows: 1 // Assumes the first row contains column headers
            },
            columnToKey: {
                A: 'Article', // Maps the first column to "Article"
                B: 'Description', // Maps the second column to "Description"
                C: 'Implications' // Maps the third column to "Implications"
            }
        });

        // Retrieves the article query without altering its case
        const articleQuery = event.queryStringParameters.article;

        // Searches for an exact match in the converted JSON
        const articleData = result.Sheet1.find(row =>
            row.Article === articleQuery
        );

        // Logs for debugging purposes
        console.log("Received article query:", articleQuery);
        console.log("Available Articles:", result.Sheet1.map(row => row.Article));

        if (articleData) {
            console.log("Found Article Data:", articleData);
            return {
                statusCode: 200,
                body: JSON.stringify(articleData)
            };
        } else {
            console.log("Article Not Found:", articleQuery);
            return {
                statusCode: 404,
                body: "Article not found"
            };
        }
    } catch (error) {
        console.error("Error in function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
*/