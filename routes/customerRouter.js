const router = require('express').Router({ mergeParams: true });
const AuthenticationController = require('../controllers/authenticationController');

const { createCustomerHandler, getAllCustomersHandler, getCustomerByIdHandler, updateCustomerByIdHandler } = require('../handler/customerHandler');

router.get('/', AuthenticationController.authorization, getAllCustomersHandler);
router.get('/:id', AuthenticationController.authorization, getCustomerByIdHandler);

router.post('/', AuthenticationController.authorization, createCustomerHandler);
router.put('/:id', AuthenticationController.authorization, updateCustomerByIdHandler);

module.exports = router;