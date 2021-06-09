let { reimbursement } = require('../data/reimbursements.js')
const mongo = require('mongodb')
const client = require('../service/connection')
const service = require('../service/employee')

const allByEmployeePending = (req, res) => {
    const {employee} = req.params
    service.getAllByEmployeePending(client, mongo.ObjectID(employee)).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('no records found')
        }

    });
}

const allByEmployeeResolved = (req, res) => {
    const {employee} = req.params
    service.getAllByEmployeeResolved(client, mongo.ObjectID(employee)).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('no records found')
        }

    });
}

const rmbPost = (req, res) => {
    const newRequest = req.body
    service.post(client, newRequest).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('request failed')
        }
    });
}

module.exports = {
    allByEmployeePending,
    allByEmployeeResolved,
    rmbPost
}