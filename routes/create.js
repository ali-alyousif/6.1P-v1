var express = require('express');
var router = express.Router();
var cors = require('cors')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
//var nodemailer = require('nodemailer');
const mail = require('../utils/mail');

const User = require('../models/users')
router.use(cors())


router.post('/', (req, res) => {
    const today = new Date()
    const UserData = {
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
        confirm_password: req.body.confirm_password,
        created : today
    }

    if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        console.log('Correct Email ');
    } else {
        console.log('Email Error');
    }
    
    if(req.body.password != req.body.confirm_password){
        console.log('Password not match');
    }
    
    //User.deleteMany({})

    User.findOne({
        email: req.body.email
    })
    .then ( user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                UserData.password = hash

                User.create(UserData)
                   .then(user => {
                       console.log('Success');

                       //Send Email
                       /*The following code took from nodemailer documentation*/
                        var mailOptions = {
                          from: 'Work.task90@gmail.com',
                          to: req.body.email,
                          subject: 'Registration Complete',
                          text: 'Welcome, your registration has been complete successfully!'
                        };

                        mail.sendMail(mailOptions)
                           .then(function (email) {
                               console.log("Email sent");
                           }).catch(function (exception ) {
                               console.log('Error while sending email');
                               console.log(exception.message);
                        });
                        /*The above code took from nodemailer documentation*/
                       
                   })
                   .catch(err => {
                      console.log('Error')
                   })
            })
        }
        else {
           console.log('User already exists');
        }
    })

    res.render('signup', { title: 'Express' });
})

module.exports = router;
