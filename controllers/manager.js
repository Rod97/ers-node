const mongo = require('mongodb')
const client = require('../service/connection')
const service = require('../service/manager')

const getAllPending = (req, res) => {
    service.getAllPending(client).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('no records found')
        }

    });
}
const getAllResolved = (req, res) => {
    service.getAllResolved(client).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('emp not found')
        }
    })
}
const getAllRequestsByEmployee = (req, res) => {
    const id = mongo.ObjectID(req.params.id);
    service.getAllRequestsByEmployee(client, id).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('emp not found')
        }
    })
}

const getAllEmployees = (req, res) => {
    service.getAllEmployees(client).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('emp not found')
        }
    })
}

const resolveRequest = ((req, res) => {
    const { reimbursement, decision } = req.body

    service.resolveRequest(client, mongo.ObjectID(reimbursement), decision).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('Cannot resolve reimbursement')
        }
    })

})
module.exports = {
    getAllPending,
    getAllResolved,
    getAllRequestsByEmployee,
    getAllEmployees,
    resolveRequest
}