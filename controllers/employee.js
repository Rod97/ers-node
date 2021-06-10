// let { employee } = require('../data')

const getEmployee = (req, res) => {
    res.status(200).json({ success: true, data: employee })
}
const createEmployee = (req, res) => {
    const { name } = req.body
    if(!name){
        return res.status(400).json({ success: false, msg: 'Provide a name'})
    }
    res.status(200).json({ success: true, data: name })
}
const updateEmployee = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const person = employee.find((person)=> person.id === Number(id))
    if (!person){
        return res.status(404).json({ success: false, msg: `No employee with id ${id}`})
    }
}
const newEmployee = employee.map((person)=>{
    if(person.id === Number(id)){
        person.name = name
    }
    return person
})
res.status(200).json({ success: true, data: newEmployee })

const deleteEmployee = (req, res) => {
    const person = employee.find((person)=> person.id === Number(req.params.id))
    if(!person){
        return res.status(404).json({ success: false, msg: `No employee with id ${req.params.id}`})
    }
    const newEmployee = employee.filter((person)=> person.id !== Number(req.params.id))
    return res.status(200).json({success: true, data: newEmployee })
}

module.exports = {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}