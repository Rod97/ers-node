const express = require('express');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))

app.listen(5051, () => {
    console.log("Port 5051");
})