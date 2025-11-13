const db = require('../config/database');

const reportController = {
    // Handle POST request to /api/report
    createReport: async (req, res) => {
        try {
            // Get device headers
            const deviceId = req.headers['x-device-id'];
            const deviceSecret = req.headers['x-device-secret'];
            
            // Get request body data
            const reportData = req.body;
            
            console.log('Report Data Received:', {
                deviceId,
                deviceSecret: deviceSecret ? '***hidden***' : 'not provided',
                payload: reportData
            });

            // Validate required headers
            if (!deviceId || !deviceSecret) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required headers: x-device-id and x-device-secret',
                    data: null
                });
            }

            // Here you can add your business logic
            // For example, save to database, process the data, etc.
            
            // Sample response with the received data
            const response = {
                success: true,
                message: 'Report received successfully',
                data: {
                    deviceId: deviceId,
                    timestamp: new Date().toISOString(),
                    receivedData: reportData,
                    processed: true
                },
                meta: {
                    endpoint: '/api/report',
                    method: 'POST',
                    version: '1.0.0'
                }
            };

            res.status(200).json(response);

        } catch (error) {
            console.error('Error in createReport:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
                data: null
            });
        }
    },

    // Handle GET request to /api/report for testing
    getReports: async (req, res) => {
        try {
            const response = {
                success: true,
                message: 'Report endpoint is working',
                data: {
                    endpoint: '/api/report',
                    methods: ['GET', 'POST'],
                    description: 'Use POST to submit report data with x-device-id and x-device-secret headers',
                    samplePayload: {
                        "reportType": "device_status",
                        "data": {
                            "status": "active",
                            "battery": "85%",
                            "location": "New York"
                        }
                    },
                    requiredHeaders: {
                        "x-device-id": "your-device-id",
                        "x-device-secret": "your-device-secret",
                        "Content-Type": "application/json"
                    }
                },
                timestamp: new Date().toISOString()
            };

            res.status(200).json(response);

        } catch (error) {
            console.error('Error in getReports:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
};

module.exports = reportController;