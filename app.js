const express = require('express');
const cors = require('cors')

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/employee', employee)
app.use('/manager', manager)
const port = process.env.PORT || 5051;
app.listen(port, () => {
    console.log(port);
})