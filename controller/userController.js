
const db = require('../model/model')
const Helper = require('../middleware/helper')
const dbUser = db.user
require('dotenv').config()
const { comparePassword } = require('../middleware/helper')
const { where } = require('sequelize')

const Op = db.Sequelize.Op;

const signUp = async (req, res) => {
    try {
        const resultHash = await Helper.hashPassword(req.body.password);
        const user = {
            username : req.body.username,
            password : resultHash,
            email : req.body.email,
            phone : req.body.phone,
            role : req.body.role,
        };
        
        console.log(user);
    
        if (!user.password || !user.email){
            return res.status(400).send({ message : 'email and password must be provided'});
        }
    
        if (!Helper.isValidEmail(user.email)) {
        return res.status(400).send({ message : 'Please enter a valid email address' });
        }
      
        await dbUser.findOne({where: {email: user.email}})
        .then(data => {
        if (data !== null) {
            return res.status(400).send({
            error: true,
            message: "email is already used"
            });
        } else {
            dbUser.create(user)
            .then(data => {
                return res.status(200).send({
                    message: "Signup success", 
                    data : data
                });
            }).catch(err => {return res.status(500).send({message : err.message})
             })
        }
        })
      } catch (err) {
        console.error(err);
        return res.status(500).send(err)
      }

}

const login = async (req, res) => {
    try {
        const user = {
            email : req.body.email,
            password : req.body.password,
        }
        
        if (!user.email|| !user.password) {
            return res.status(400).send({ message : 'email and password is provided'});
        }
        
        if (!Helper.isValidEmail(user.email)) {
            return res.status(400).send({ message : 'Please enter a valid email address' });
        }
        
        await dbUser.findOne({where: {email: user.email}})
            .then(data => {
            if (data === null) {
                return res.status(400).send({
                message: "your email is not registered"
                });
            } else {
            
            if(!Helper.comparePassword(data.password, user.password)) {
                return res.status(400).send({ message : 'The credentials you provided is incorrect' })
            }
   
            console.log('berhasil login');
            const token = Helper.generateToken(data.dataValues.id_user, user.email, data.role );
            return res.status(200).json({
                message : "Login successful",
                data,
                token
            });

            }
        })
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }

}


const updatePassword = async (req, res) => {
    try {
        id_user = req.params.id
        hasil = await dbUser.findByPk(id_user)
        if(!hasil ) throw {message : 'User not found'}
        if(!comparePassword(hasil.password, req.body.oldpassword)){
            return res.status(400).send({message: "Password lama salah"})
        }
        data = {
          password : Helper.hashPassword(req.body.newpassword)
        }
        await dbUser.update(data,{where: {id_user : id_user}})
        .then(data1 => {
          console.log(data);
          if ( data1[0] === 1){
            res.status(200).send({ message : 'password successfully updated'})
          }
          
        })
        
      } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message, error : true})
      }
}

module.exports = {
    signUp,
    // updatePasswordByEmail, 
    login,
    // activateAccount,
    updatePassword,
    
    // getUsers,
    // updateAll,
    // getUsersById
}