const express = require('express');
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');
const router = express.Router();

// Send SOS Alert
router.post('/sos', auth, async (req, res) => {
  try {
    const { latitude, longitude, message, type } = req.body;
    
    const alert = new Alert({
      userId: req.userId,
      type: type || 'sos',
      latitude,
      longitude,
      message
    });
    
    await alert.save();
    
    // TODO: Send SMS/Email to emergency contacts & police
    
    res.status(201).json({
      message: 'SOS alert sent successfully',
      alertId: alert._id,
      status: 'sent'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send alert' });
  }
});

// Get user alerts
router.get('/my-alerts', auth, async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
