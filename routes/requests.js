const express = require('express');

const router = express.Router();
const {
    getRequests,
    createRequest
} = require('../controllers/requests')

router.route('/').get(getRequests).post(createRequest)

module.exports = router