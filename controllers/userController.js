const models = require('../models/index')
const bcrypt = require('bcrypt')

const AuthenticationController = require('./authenticationController');

class UserController {

    constructor() {
        this.constructor = constructor;
    }
    
    static async createUser (payload, companyName) {
        try {
            const { password } = payload
            const company = await models.Company.findOne({ where: { name: companyName } });
            if (company) {
                throw new Error('Company Already Exists');
            }
            const createCompany = await models.Company.create({ name: companyName });
            if (!createCompany) {
                throw new Error('Failed to create company');
            }

            const getHashCode = await bcrypt.hash(password, 10)
            console.log(getHashCode);

            const user = await models.User.create({ ...payload, companyId: createCompany.id, password: getHashCode });

            console.log('User created:', user);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static getUserById = async (userId, transaction) => {
        try {
            const user = await models.sequelize.query(
                `SELECT u.id, u.email, u.phoneNumber, c.name as companyName
                FROM User u
                INNER JOIN Company c ON u.companyId = c.id
                WHERE u.id = :userId`,
                {
                    replacements: { userId },
                    type: models.Sequelize.QueryTypes.SELECT
                },
                transaction
            );
            if (!user || user.length === 0) {
                throw new Error('User not found');
            }
            return user[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static updateUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const { name, email, phoneNumber } = req.body;
            const [updated] = await models.User.update({ name, email, phoneNumber }, {
                where: { id: userId }
            });
            if (!updated) {
                throw new Error('User not found');
            }
            return res.status(200).json({
                message: 'User updated successfully',
                user: {
                    id: userId,
                    name,
                    email,
                    phoneNumber
                }
            });
        } catch (error) {
            throw new Error('Internal server error');
        }
    }

    static loginUser = async (payload) => {
        try {
            const { email, password, companyName } = payload;
            const user = await models.sequelize.query(
                `SELECT u.id, u.email, u.phoneNumber, u.password, c.name as companyName
                FROM User u
                INNER JOIN Company c ON u.companyId = c.id
                WHERE u.email = :email AND c.name = :companyName`,
                {
                    replacements: { email, password, companyName },
                    type: models.Sequelize.QueryTypes.SELECT
                }
            );
            if (!user || user.length === 0) {
                throw new Error('No Record Found');
            }
            const compareHashCode = await bcrypt.compare(password, user[0].password)
            const authentication = await AuthenticationController.authentication(user[0]);

            if(compareHashCode && authentication) {
                return {
                message: 'Login successful',
                token: authentication,
                id: user[0].id,
            };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static getAllCompany = async () => {
        try {
            const companies = await models.sequelize.query(
                `SELECT name FROM Company`,
                { type: models.Sequelize.QueryTypes.SELECT }
            );
            if (!companies || companies.length === 0) {
                throw new Error('No companies found');
            }
            return {
                status: 'success',
                data: companies
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = UserController;
