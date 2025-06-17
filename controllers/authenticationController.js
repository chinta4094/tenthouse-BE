const jwt = require('jsonwebtoken');

class AuthenticationController {
  constructor() {
  }

  static async authentication(userDetails) {
    try {
      const { id, email } = userDetails;
      const userToken = jwt.sign({ id, email }, 'SECRET_TOKEN');
      return userToken;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async authorization(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      jwt.verify(token, 'SECRET_TOKEN', (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token Expired or Invalid' });
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      await this.authenticationService.logout(req.user);
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AuthenticationController;