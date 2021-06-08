let { reimbursement } = require('../data/reimbursements.js')
const mongo = require('mongodb')
const client = require('../service/connection')
const service = require('../service/manager')

const getAllByEmployeePending = (req, res) => {
    service.getAllByEmployeePending(client).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('no records found')
        }

    });
}

const getAllByEmployeeResolved = (req, res) => {
    service.getAllByEmployeeResolved(client).then((result) => {
        if (result) { res.status(200).json({ success: true, data: result }) }
        else {
            res.status(404).send('no records found')
        }

    });
}

module.exports = {
    getAllByEmployeePending,
    getAllByEmployeeResolved
}