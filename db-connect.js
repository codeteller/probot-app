const sql = require('mssql')

const sqlConfig = {
    user: "faizy",
    password: "Helloworld95",
    database: "probot",
    server: 'test-db-faizy.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

async function connectAndQueryDb(query) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        console.log("Inside the query")
        await sql.connect(sqlConfig)
        const result = await sql.query(query);
        console.dir(result)
        console.log('Query has been made')
    } catch (err) {
        // ... error checks
        console.log("Inside error", err)
    }
}

exports.connectAndQueryDb = connectAndQueryDb;