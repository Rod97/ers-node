const express = require('express');

const app = express();

const employee = require('./routes/employee')
const manager = require('./routes/manager')

app.use(express.static('./public'))
app.use('/manager', manager)

// app.get('/filtering/:id', function(req,res,next){
//     if(req.params.id === 'Pending') next('/manager')
//     else next()
//     let test = function (req,res,next){
//     }
// })

app.listen(5051, () => {
    console.log("Port 5051");
})