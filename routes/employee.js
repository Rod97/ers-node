const express = require('express');

const router = express.Router();
const {
    allByEmployeePending,
    allByEmployeeResolved,
    rmbPost
} = require('../controllers/employee');

router.route('/pending/:employee').get(allByEmployeePending)
router.route('/resolved/:employee').get(allByEmployeeResolved)
router.route('/request').post(rmbPost)


module.exports = router