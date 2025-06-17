
const UserController = require('../controllers/userController');

async function createUserHandler(req, res) {
    try {
        const { companyName } = req.body;
        const user = await UserController.createUser(req.body, companyName);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getUserHandler(req, res) {
    try {
        const userId = req.params.id;
        const user = await UserController.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateUserHandler(req, res) {
    try {
        const userId = req.params.id;
        const { name, email, phoneNumber } = req.body;
        const user = await UserController.updateUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update({ name, email, phoneNumber });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message  });
    }
}

const loginUserHandler = async (req, res) => {
    try {
        const loginDetails = await UserController.loginUser(req.body);
        res.status(200).json({ status: 'success', data: loginDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCompanyHandler = async (req, res) => {
    try {
        const companies = await UserController.getAllCompany();
        if (!companies || companies.length === 0) {
            return res.status(404).json({ error: 'No companies found' });
        }
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createUserHandler,
    getUserHandler,
    updateUserHandler,
    loginUserHandler,
    getCompanyHandler
};