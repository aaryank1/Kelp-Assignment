export const insertData = async (db, data) => {
    try{
        const query = {
            text: `INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)`,
            values: [
                JSON.stringify(data.name.firstName + " " + data.name.lastName),
                data.age,
                (!data.address.line1 && !data.address.line2 && !data.address.city && !data.address.state) ? null : JSON.stringify({
                    line1: data.address.line1 ? data.address.line1 : null,
                    line2: data.address.line2 ? data.address.line2 : null,
                    city: data.address.city ? data.address.city : null,
                    state: data.address.state ? data.address.state : null,
                }),
                data.gender ? JSON.stringify(data.gender) : null
            ]
        }
        const result = await db.query(query);
        // console.log("Data Inserted Successfully:\n", result);
        return result;
    }
    catch(err){
        console.error("Error Inserting Data:\n", err);
    }
}

export const ageDistribution = async (db) => {
    try{
        const totalAgeCountResult = await db.query(`SELECT COUNT(*) FROM users;`);
        const below20Result = await db.query(`SELECT COUNT(*) FROM users WHERE age < 20;`);
        const above20Result = await db.query(`SELECT COUNT(*) FROM users WHERE age >= 20 AND age < 40;`);
        const above40Result = await db.query(`SELECT COUNT(*) FROM users WHERE age >= 40 AND age < 60;`);
        const above60Result = await db.query(`SELECT COUNT(*) FROM users WHERE age >= 60;`);
        
        const totalAgeCount = totalAgeCountResult.rows[0].count;
        const below20 = totalAgeCount ? Number((below20Result.rows[0].count / totalAgeCount * 100).toFixed(2)) : 0;
        const above20 = totalAgeCount ? Number((above20Result.rows[0].count / totalAgeCount * 100).toFixed(2)) : 0;
        const above40 = totalAgeCount ? Number((above40Result.rows[0].count / totalAgeCount * 100).toFixed(2)) : 0;
        const above60 = totalAgeCount ? Number((above60Result.rows[0].count / totalAgeCount * 100).toFixed(2)) : 0;

        console.log("Total Age Count:", totalAgeCountResult.rows[0].count);
        console.log("Below 20 Count:", below20Result.rows[0].count);
        console.log("20-40 Count:", above20Result.rows[0].count);
        console.log("40-60 Count:", above40Result.rows[0].count);
        console.log("Above 60 Count:", above60Result.rows[0].count);

        return {
            below20: below20,
            "20-40": above20,
            "40-60": above40,
            above60: above60,
        }
    }
    catch(err){
        console.error("Error Fetching Age Distribution:\n", err);
    }
}