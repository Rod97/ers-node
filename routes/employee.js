const express = require('express');
const router = express.Router();

const {
    getEmployeeHome,
    getAllByEmployeePending,
    getAllByEmployeeResolved
} = require('../controllers/employee');

router.route('/employee/pending/:employee').get(getAllByEmployeePending)
router.route('/employee/resolved/:employee').get(getAllByEmployeeResolved)

module.exports = router