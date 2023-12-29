// ---------------------------------------------------------------------------
const router = require('express').Router();

const postRoutes = require('./api/post-routes');

router.use('/api/post', postRoutes);


module.exports = router;