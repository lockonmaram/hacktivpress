const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var FB = require('fb')

class UserController {
  static registerUser(req, res){
    console.log(req.body);
    const saltUser = bcrypt.genSaltSync(8)
    const hashedPassword = bcrypt.hashSync(req.body.password, saltUser)
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      salt: saltUser
    }, function(err, user){
      console.log(user);
      if (!err){
        const tokenUser = jwt.sign({
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          isAdmin: user.isAdmin
        }, 'hacktivpress')
        console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first, last_name: user.last_name })
      }
    })
  }
  static getUsers(req, res){
    User.find({},function(err, users){
      res.status(200).json(users)
    })
  }
  static login(req, res){
    User.findOne({ email: req.body.email})
    .then(user => {
      const passwordCheck = bcrypt.compareSync(req.body.password, user.password)
      console.log(user.password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const tokenUser = jwt.sign({
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        }, 'hactivpress')
        console.log(tokenUser);
        res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name })
        // req.headers.token = tokenUser
      }else {
        res.status(400).json('wrong password')
      }
    })
    .catch(err=>{
      res.status(400).json('email is not found')
    })
  }
  static fbLogin(req, res){
    FB.api('me', { fields: ['id', 'name', 'email', 'first_name', 'last_name'], access_token: `${req.body.token}` }, function (resFb) {
      console.log('resfb------>',resFb);
      User.find({ email: resFb.email }, function (err, regist) {
        // console.log(regist);
        if (regist[0].email !== resFb.email) {
          const saltUser = bcrypt.genSaltSync(8)
          const hashedPassword = bcrypt.hashSync(`${resFb.first_name}123`, saltUser)
          User.create({
            first_name: resFb.first_name,
            last_name: resFb.last_name,
            email: resFb.email,
            password: hashedPassword,
            salt: saltUser
          }, function(err, user){
            if (!err){
              const tokenUser = jwt.sign({
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
              }, 'hactivpress')
              console.log(tokenUser);
              res.status(200).json({token: tokenUser, userId: user._id, first_name: user.first_name, last_name: user.last_name })
            }
          })
        }else if(regist[0].email === resFb.email){
          const tokenUser = jwt.sign({
            id: regist[0]._id,
            email: regist[0].email,
            first_name: regist[0].first_name,
            last_name: regist[0].last_name
          }, 'hactivpress')
          console.log(regist);
          console.log('tokenasdasd',tokenUser);
          res.status(200).json({token: tokenUser, userId: regist[0]._id, first_name: regist[0].first_name, last_name: regist[0].last_name })
          // req.headers.token = tokenUser
        }
      });
    });
  }
}

module.exports = UserController
