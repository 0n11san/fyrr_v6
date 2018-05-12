const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const db = require("../models");

// generates json web token
const generateToken = (_id, username) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
        data: {
            _id,
            username
        }
    }, 'someone');
    return token;
};

// signup post to create new user
apiRouter.post("/signup", (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.User.findOne({username})
        .then((user) => {
            if (user) {
                return res.status(409).json({error: "User already exists"});
            }

            const create_user = new db.User({
                username,
                password: hash
            });
            create_user.save((err, user) => {
                if (err) {
                    return err;
                }

                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });
});

// signin post
apiRouter.post("/signin", (req, res) => {
    const {username, password} = req.body;

    db.User.findOne({username})
        .then((user) => {
            if (bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg: "User is signed in"});
            } else {
                res.status(400).json({error: 'Password does not match'});
            }
        })
        .catch((err) => {
            res.status(400).json({err: "Connection error"});
        });

});

// verifies cookies from login
const verifyCookie = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, 'awesome', (err, decoded) => {
        if(err){
            res.status(401).json({error:"Access Denied"});
        } else{
            next();
        }
    });

};

apiRouter.get('/HowTo', verifyCookie, (req, res) => {
    res.json({msg: "Cookie verified"});
});

module.exports = apiRouter;
