const express = require('express');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/employee', employee)
app.use('/manager', manager)

/*app.get('/employee/request', (req, res) => {
    res.write(employee.rmbPost)
    res.end()
})

app.get('/employee/pending/:employee', (req, res) => {
    res.write(employee.allByEmployeePending)
    res.end()
})

app.get('/employee/resolved/:employee', (req, res) => {
    res.write(employee.allByEmployeeResolved)
    res.end()
})*/

app.listen(5051, () => {
    console.log("Port 5051");
})