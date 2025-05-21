import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import fs from "fs";
import { ageDistribution, insertData } from "./dbOperations.js";
import csvToJson from "./csvToJSON.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const CSV_PATH = process.env.CSV_PATH;

// Estabilishing connection to PostgreSQL Database using pg
const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "Kelp",
    password: process.env.DB_PWD,
    port: 5432,
});

db.connect();

// '/analyze-csv' endpoint to read CSV file and insert data into PostgreSQL. This endpoint also fetches the age distribution of users from the database.
app.get("/analyze-csv", (req, res) => {

    // Read CSV File and convert to JSON
    fs.readFile(CSV_PATH, "utf-8", async (err, data) => {
        if(err){
            console.error("Error Reading CSV File:\n", err);
            res.status(500).send("Error Reading CSV File");
        }
        else{
            const jsonInfo = csvToJson(data);
            let ageDist = null;

            // Insert data to Postgres Database
            try{
                for(const user of jsonInfo){
                    await insertData(db, user);
                }
                
                // Upon successfully inserting data, fetch the percentage age distribution.
                try {
                    ageDist = await ageDistribution(db);
                    console.log("Age Distribution:\n", ageDist);
                }
                catch (error) {
                    console.error("Error Fetching Age Distribution:\n", error);
                    res.status(500).send("Error Fetching Age Distribution");
                }
            }
            catch(err){
                console.error("Error Inserting Data:\n", err);
                res.status(500).send("Error Inserting Data");
            }
            
            res.status(200).json({
                users: jsonInfo,
            });
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})