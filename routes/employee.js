const express = require('express');

const router = express.Router();
const {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employee')

router.route('/').get(getEmployee).post(createEmployee)
router.route('/:id').put(updateEmployee).delete(deleteEmployee)

module.exports = router