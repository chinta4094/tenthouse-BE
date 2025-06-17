// routes/index.js or mainRouter.js

const router = require('express').Router();
const userRouter = require('./userRoutes');
const { getCompanyHandler } = require('../handler/userHandler');

router.use('/user', userRouter);

router.get('/company', getCompanyHandler);

module.exports = router;
