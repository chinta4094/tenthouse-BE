// const models = require('../models'); // Adjust the path as necessary

const models = require('../models'); // Adjust the path as necessary
const { getUserHandler } = require('../handler/userHandler');
const UserController = require('./userController'); // Assuming you have a UserController for user-related operations

class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }

    static async createCustomer(payload) {
        console.log(payload)
        const userId = payload.userId
        const { name, email, phoneNumber } = payload.customerDetailswithoutAddress
        const { street, city, state, pincode, country } = payload.customerAddress
        let transaction
        transaction = await models.sequelize.transaction()
        try {
            if (!userId || !name || !email) {
                throw new Error('User ID, name, and email are required');
            }
            const getUser = await UserController.getUserById(userId, transaction);
            if (!getUser) {
                throw new Error('User not found');
            }
            const address = await models.Address.create({ street, city, pincode }, {transaction})
            if (!address) {
                throw new Error('Failed to create Address');
            }
            const customer = await models.Customer.create({ name, email, phoneNumber, userId, addressId: address?.dataValues?.id }, {transaction});
            if (!customer) {
                throw new Error('Failed to create Customer');
            }
            await transaction.commit()
            return {
                customerData: customer,
                addressData: address
            }
        } catch (error) {
            await transaction.rollback()
            throw new Error('Error creating customer: ' + error.message);
        }
    }

    static async getAllCustomers(payload) {
        const { userId, pagination } = payload;
        let result;
        let customerData = []
        let customerAddress = []
        try {
            const limit = 3; // Limit to 3 customers per page
            const offset = (pagination - 1) * limit;
            const getUser = await UserController.getUserById(userId);
            if (!getUser) {
                throw new Error('User not found');
            }
            const countNoCustomers = await models.Customer.count({ where: { userId } });
            if (countNoCustomers === 0) {
                return {
                    count: 0,
                    customers: []
                };
            }
            const customers = await models.Customer.findAll({ 
                where: { userId }, limit, offset,
                    include: [{
                    model: models.Address,
                    as: 'address',
                    require: false
                }] 
            });
            customers.map((customer) => {
                customerData.push(customer?.dataValues)
                customerAddress.push(customer?.address?.dataValues)
            })
            result = {
                count: countNoCustomers,
                customerData,
                customerAddress
            };
            return result
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getCustomerById(customerId) {
        try {
            const customers = await models.Customer.findOne({
                where : {
                    id: customerId
                },
                as: 'customer',
                include: [{
                    model: models.Address,
                    as: 'address',
                    required: false // Makes it an INNER JOIN
                }],
            });

            if (!customers) {
                throw new Error('Customer not found');
            }
            return {
                customerData: customers?.dataValues,
                customerAddress: customers?.address?.dataValues
            }
        } catch (error) {
            throw new Error('Error retrieving customer: ' + error.message);
        }
    }

    static async updateCustomerById(payload) {
        let transaction
        const customerId = payload.customerId;
        const { name, email, phoneNumber, addressId } = payload.customerDetailswithoutAddress
        const { street, city, state, pincode, country } = payload.customerAddress
        transaction = await models.sequelize.transaction()
        try {
            const fetchCustomer = await models.Customer.findByPk(customerId, {transaction});
            if (!fetchCustomer) {
                throw new Error('Customer not found');
            }
            const updateCustomer = await models.Customer.update({
                name,
                email,
                phoneNumber
            }, {where : { id: customerId }, transaction},)
            const udpateAddress = await models.Address.update({
                street, city, pincode
            }, { where : { id: addressId }, transaction},)
            await transaction.commit()
            return {
                updateCustomer,
                udpateAddress
            }
        } catch (error) {
            await transaction.rollback()
            throw new Error('Error updating customer: ' + error.message);
        }
    }
}

module.exports = CustomerController;
