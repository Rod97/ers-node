const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://rod:FDyx3AW6XMXan%23y@ers-data.g2qxm.mongodb.net/ers-database?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true });

module.exports = client;

// {
//     "amount":int,
//     "reason":String,
//     "employee_id":employee_id,
//     "status":string
// }