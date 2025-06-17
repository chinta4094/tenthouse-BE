
const router = require('express').Router({ mergeParams: true });

const { createUserHandler, getUserHandler, updateUserHandler, loginUserHandler} = require('../handler/userHandler');

const customerRouter = require('./customerRouter');

router.get('/:id', getUserHandler);
router.put('/:id', updateUserHandler);

router.post('/login', loginUserHandler);
router.post('/register', createUserHandler);

router.use('/:id/customer', customerRouter);

module.exports = router;
