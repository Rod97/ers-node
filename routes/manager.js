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

router.route('/pending').get(getAllPending)
router.route('/resolved').get(getAllResolved)
router.route('/employee/:id').get(getAllRequestsByEmployee)
router.route('/employees').get(getAllEmployees)
router.route('/manage').put(resolveRequest)


module.exports = router