let { reimbursement } = require('../data/reimbursements.js')

const getAllReimbursements = (req, res) => {
    console.log('getting all');
    res.status(200).json({ success: true, data: reimbursement })
    res.end()
}

const getReimbursementById = (req, res, next) => {
    const { id } = req.params
        console.log('getting by id');
        let reimbursementToGet= reimbursement.find((reimbursement) => {
            return reimbursement.id === Number(id)
        })
  
    res.status(200).send({ data: reimbursementToGet });
}

 const getReimbursementByStatus = (req, res) => {
    const reimbursementsByStatus = reimbursement.filter((reimbursement) => reimbursement.status.toLowerCase() === req.query.status.toLowerCase())

    res.status(200).json({success: true, data: reimbursementsByStatus})
 }
module.exports = {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus
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