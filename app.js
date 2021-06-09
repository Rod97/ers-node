const express = require('express');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/manager', manager)


app.listen(process.env.PORT || 5051, () => {
    console.log("Port 5051");
})