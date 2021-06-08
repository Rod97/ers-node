const { query } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus,
    getAllPending,
    getAllResolved
} = require('../controllers/manager')

router.route('/').get(getAllReimbursements)
//router.route('/requests/:id').get(getReimbursementById, getReimbursementById)
router.route('/requests').get(getReimbursementByStatus)
router.route('/requests/pending/').get(getAllPending)
router.route('/requests/resolved/').get(getAllResolved)


module.exports = router