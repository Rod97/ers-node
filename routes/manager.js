const { query } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllReimbursements,
    getReimbursementById,
    getReimbursementByStatus,
    postSomething
} = require('../controllers/manager')

router.route('/').get(getAllReimbursements)
router.route('/requests/:id').get(getReimbursementById, getReimbursementById)
router.route('/requests').get(getReimbursementByStatus)
router.route('/post').post(postSomething)

module.exports = router