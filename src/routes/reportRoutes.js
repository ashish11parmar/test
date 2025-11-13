const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET /api/report - Test endpoint to verify the API is working
router.get('/report', reportController.getReports);

// POST /api/report - Main endpoint to receive report data
router.post('/report', reportController.createReport);

module.exports = router;