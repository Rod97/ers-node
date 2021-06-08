const { query } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus,
    getAllPending,
    getAllResolved,
    getAllRequestsByEmployee,
    getAllEmployees
} = require('../controllers/manager')

router.route('/').get(getAllReimbursements)
//router.route('/requests/:id').get(getReimbursementById, getReimbursementById)
router.route('/requests').get(getReimbursementByStatus)
router.route('/requests/pending/').get(getAllPending)
router.route('/requests/resolved/').get(getAllResolved)
router.route('/requests/employee/:id').get(getAllRequestsByEmployee)
router.route('/employees/').get(getAllEmployees)


module.exports = router