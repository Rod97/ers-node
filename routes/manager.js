const { query } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus
} = require('../controllers/manager')

router.route('/').get(getAllReimbursements)
router.route('/requests/:id').get(getReimbursementById, getReimbursementById)
router.route('/requests').get(getReimbursementByStatus)

module.exports = router