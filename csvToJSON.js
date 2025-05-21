const csvToJson = (data) => {
    const rows = data.split("\n").slice(1);
    const csvData = rows.map(row => {
        const columns = row.split(",");
        return {
            name: {
                firstName: columns[0],
                lastName: columns[1]
            },
            age: columns[2] ? parseInt(columns[2]) : null,
            address: {
                line1: columns[3] || null,
                line2: columns[4] || null,
                city: columns[5] || null,
                state: columns[6] || null,
            },
            gender: columns[7]?.replace(/\r|\n/g, "") || null,
        }
    });
    // console.log(csvData[0].address.city)
    return csvData;
}

export default csvToJson;