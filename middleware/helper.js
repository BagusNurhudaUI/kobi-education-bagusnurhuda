const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

SECRET = process.env.SECRET

const Helper = {
    hashPassword: (password) => {
        return bcrypt.hash(password, 10);
    },

    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
      },
     
    isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    },

    idNotFound(){
        return {message: 'id not found', error: true}
    },
    
    generateToken(id, email, role) {
    const token = jwt.sign(
    {
        id_user: id,
        email: email,
        role: role
    },
        SECRET, { expiresIn: '1d' }
    )
    return token;
    },
}

module.exports = Helper;