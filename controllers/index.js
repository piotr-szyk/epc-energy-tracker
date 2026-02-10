const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api'); // This looks for controllers/api/index.js

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;