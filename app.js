// const express = require('express');

// const app = express();

// const employee = require('./routes/employee')
// const manager = require('./routes/manager')

// app.use(express.static('./public'))
// app.use('/manager', manager)

// app.listen(5051, () => {
//     console.log("Port 5051");
// })
const { MongoClient } = require('mongodb');

async function main() {
    const uri = `mongodb+srv://rod:FDyx3AW6XMXan%23y@ers-data.g2qxm.mongodb.net/ersDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.log(e);
    }finally{
        await client.close();
    }

}
main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` -${db.name}`);        
    });
}