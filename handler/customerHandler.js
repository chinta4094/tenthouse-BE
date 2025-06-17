const CustomerController = require('../controllers/customerController');


const createCustomerHandler = async (req, res) => {
    const userId = req.params.id; // Assuming user ID is passed in the params
    const { customerDetailswithoutAddress, customerAddress } = req.body;

    const payload = { userId, customerDetailswithoutAddress, customerAddress };
    const result = await CustomerController.createCustomer(payload);
    if (result) {
        res.status(201).json({ status: 'success', message: 'Customer created successfully', data: result });
    } else {
        res.status(400).json({ status: 'error', message: 'Failed to create customer' });
    }
};

const getAllCustomersHandler = async (req, res) => {
    
    const userId = req.params.id; // Assuming user ID is passed in the params
    const pagination = req.query.page ? parseInt(req.query.page, 10) : 1;
    const payload = { userId, pagination };
    const result = await CustomerController.getAllCustomers(payload);
    if (result) {
        res.status(200).json({ status: 'success', data: result });
    } else {
        res.status(400).json({ status: 'error', message: 'Failed to retrieve customers' });
    }
};

const getCustomerByIdHandler = async (req, res) => {
    const { id } = req.params; // Assuming customer ID is passed in the params
    const result = await CustomerController.getCustomerById(id);
    if (result) {
        res.status(200).json({ status: 'success', data: result });
    } else {
        res.status(404).json({ status: 'error', message: 'Customer not found' });
    }
};

const updateCustomerByIdHandler = async (req, res) => {
    const customerId = req.params.id; // Assuming user ID is passed in the params
    const { customerDetailswithoutAddress, customerAddress } = req.body;

    const payload = { customerId, customerDetailswithoutAddress, customerAddress };
    const result = await CustomerController.updateCustomerById(payload);
    if (result) {
        res.status(200).json({ status: 'success', message: 'Customer updated successfully', data: [result] });
    } else {
        res.status(400).json({ status: 'error', message: 'Failed to update customer' });
    }
};

module.exports = {
    createCustomerHandler,
    getAllCustomersHandler,
    getCustomerByIdHandler,
    updateCustomerByIdHandler
};