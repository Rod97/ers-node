const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://rod:<FDyx3AW6XMXan#y>@ers-data.g2qxm.mongodb.net/ers-database?retryWrites=true&w=majority';
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