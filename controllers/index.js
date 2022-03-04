// collect everything and packag up for server.js to use

const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const viewRoutes = require ('./view-routes/homepage')

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/homepage', viewRoutes)



module.exports = router;