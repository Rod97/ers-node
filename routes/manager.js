const { query } = require('express');
const express = require('express');
const router = express.Router();

const {

    getAllPending,
    getAllResolved,
    getAllRequestsByEmployee,
    getAllEmployees,
    resolveRequest
} = require('../controllers/manager')

router.route('/requests/pending').get(getAllPending)
router.route('/requests/resolved').get(getAllResolved)
router.route('/requests/employee/:id').get(getAllRequestsByEmployee)
router.route('/employees').get(getAllEmployees)
router.route('/requests/manage').put(resolveRequest)


module.exports = router