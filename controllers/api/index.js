const router = require('express').Router();
const searchRoutes = require('./searchRoutes');

// This makes the route available at /api/search
router.use('/search', searchRoutes);

module.exports = router;