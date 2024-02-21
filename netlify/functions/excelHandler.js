const { readFileSync } = require('fs');
//const path = require('path');
const excelToJson = require('convert-excel-to-json');

exports.handler = async (event, context) => {
    try {
        // Adjust the file path according to your project structure
        const filePath ='https://github.com/satyam3196/fishapp1/blob/d03e93e12d17e4bca40d4376a190dec4f04bc2fc/data1.xlsx';
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









/*
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