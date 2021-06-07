const express = require('express');
const pending = require('./controllers/pending');
const resolved = require('./controllers/resolved');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))

app.get('/view/pending', (req, res) => {
    res.write(pending.join())
    res.end()
})

app.get('/view/resolved', (req, res) => {
    res.write(resolved.join())
    res.end()
})

app.listen(5051, () => {
    console.log("Port 5051");
})