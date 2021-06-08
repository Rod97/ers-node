let { reimbursement } = require('../data/reimbursements.js')
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

const getAllReimbursements = (req, res) => {
    console.log('getting all');
    res.status(200).json({ success: true, data: reimbursement })
    res.end()
}

const getReimbursementById = (req, res, next) => {
    const { id } = req.params
    console.log('getting by id');
    let reimbursementToGet = reimbursement.find((reimbursement) => {
        return reimbursement.id === Number(id)
    })

    res.status(200).send({ data: reimbursementToGet });
}

const getReimbursementByStatus = (req, res) => {
    const reimbursementsByStatus = reimbursement.filter((reimbursement) => reimbursement.status.toLowerCase() === req.query.status.toLowerCase())

    res.status(200).json({ success: true, data: reimbursementsByStatus })
}

const postSomething = (req, res) => {
    const thingToPost = {
        amount: 100,
        status: 'Pending'
    }

    service(client, thingToPost)
    res.status(200).send('worked maybe?')
}
module.exports = {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus,
    getAllPending,
    getAllResolved
}
// const updateAmount = (req,res) => {
//     // reimubrsement ID
//     const { id } = req.params;
//     const { amount } = req.params;

//     const reimbursementToUpdate = reimbursement.map((reimbursement) => {
//         if(reimbursement.id === Number(id)){
//             reimbursement.amount = Number(amount)
//         }
//         return reimbursement
//     })
// }