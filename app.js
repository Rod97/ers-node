const express = require('express');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))
app.use('/manager', manager)

app.use('/employee', employee)
app.use('/manager', manager)

app.listen(5051, () => {
    console.log("Port 5051");
})