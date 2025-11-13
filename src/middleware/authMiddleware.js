// Middleware to validate device headers
const validateDeviceHeaders = (req, res, next) => {
    const deviceId = req.headers['x-device-id'];
    const deviceSecret = req.headers['x-device-secret'];
    
    if (!deviceId || !deviceSecret) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Missing device headers',
            required: ['x-device-id', 'x-device-secret'],
            data: null
        });
    }
    
    // You can add additional validation logic here
    // For example, check if the device ID and secret are valid
    
    next();
};

// Middleware to log requests
const logRequest = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', {
        'x-device-id': req.headers['x-device-id'],
        'x-device-secret': req.headers['x-device-secret'] ? '***hidden***' : 'not provided',
        'content-type': req.headers['content-type']
    });
    next();
};

module.exports = {
    validateDeviceHeaders,
    logRequest
};