# Kelp Assignment - User CSV API

This project is a simple Node.js API that reads user data from a CSV file, inserts it into a PostgreSQL database, and provides age distribution statistics.

## Features
- Reads user data from a CSV file (`users.csv`).
- Converts CSV data to JSON format.
- Inserts each user into a PostgreSQL database.
- Calculates and returns the age distribution of users in the database.

## How It Works
1. **CSV to JSON**: The API reads the CSV file and converts each row into a JSON object.
2. **Database Insertion**: Each user from the JSON array is inserted into the `users` table in the PostgreSQL database.
3. **Age Distribution**: After all users are inserted, the API calculates the percentage of users in different age groups (below 20, 20-40, 40-60, above 60).
4. **API Response**: The API returns the list of users and the age distribution statistics.

## How to Use
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set up your `.env` file** with the following variables:
   ```env
   CSV_PATH=./dataset/users.csv
   DB_PWD=your_postgres_password
   ```
3. **Start PostgreSQL** and make sure your `users` table exists (see `user_table.sql`).
4. **Run the server**:
   ```bash
   node index.js
   ```
5. **Access the API**:
   - Send a GET request to `http://localhost:3000/analyze-csv` OR use API Clients like Postman or Thunder Client
   - The API will read the CSV, insert users, and return the users as JSON and age distribution in the console.

## Example Response
```json
{
  "users": [
    {
      "name": { "firstName": "Aaryan", "lastName": "Kakade" },
      "age": 22,
      "address": { "line1": "XYZ", "line2": "ABC", "city": "Navi Mumbai", "state": "Maharashtra" },
      "gender": "Male"
    },
    ...
  ]
}
```

## Notes
- Make sure your PostgreSQL server is running and accessible.
- The API will insert all users from the CSV every time `/analyze-csv` is called (may create duplicates).
- Age distribution is calculated as a percentage with 2 decimal places.

---

**This project is part of a coding challenge assigned by a company.**