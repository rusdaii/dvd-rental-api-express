const express = require('express');
const router = express.Router();
const categoriesRouter = require('./category')
const movieRouter = require('./movie')

router.use('/category', categoriesRouter)
router.use('/movie', movieRouter)

module.exports = router;