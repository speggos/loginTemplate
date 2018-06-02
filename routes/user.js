import {checkPassword, hashPassword} from "../helpers/crypto";
import mongoose from "mongoose";
import User from "../models/user";
import express from 'express';

const userRoutes = express.Router();

// Get all users
userRoutes.get('/', (req, res) => {
    console.log('here');
    User.find()
        .select("_id username email")
        .exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// Get User by ID
userRoutes.get('/:id', (req, res, next) => {

    User.findById(req.params.id)
        .select("_id username email")
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json("No user found with provided ID");
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
});

// Add User
// TODO make username exists/password exists clearer
userRoutes.post('/', (req, res) => {

    //Check for email collision
    User.find({email: req.body.email}).exec()
        .then(user => {
            if (user.length) {
                return res.status(409).json({error: "User with that email already exists"})
            } else {
                //Check for username collision
                User.find({username: req.body.username}).exec()
                    .then(user => {
                        if (user.length) {
                            return res.status(409).json({error: "User with that username already exists"})
                        } else {
                            const password = hashPassword(req.body.password);

                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                username: req.body.username,
                                password: password,
                            });

                            user.save()
                                .then(result => {
                                    res.status(200).json({
                                        _id: result._id,
                                        username: result.username,
                                        email: result.email,
                                    });
                                })
                                .catch(err => {
                                    res.status(400).json(err.message);
                                })
                        }
                    })
            }
        });
});

// Delete User
userRoutes.delete('/:id', (req, res) => {
    User.remove({_id:req.params.id}).exec()
        .then(result => {
            console.log(result.n);
            if (result.n === 0) {
                res.status(400).json({message:"User does not exist"});
            }

            res.status(200).json({message:"Successfully deleted user"});

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// Update User
userRoutes.patch('/:id', (req, res) => {
    const fieldsToUpdate = {};
    for (let [key, value] of Object.entries(req.body)) {
        fieldsToUpdate[key] = value;
    }

    User.update({_id:req.params.id}, fieldsToUpdate).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({error: err.message});
        })
});

userRoutes.post('/login', (req, res) => {

    const userPassword = User.getUserByEmailOrUsername(req.body.username, req.body.email, (err, result) => {
        if (err) {
            return console.log('heres err', err.message);
        }

        console.log('result is', result);
    });

    const validUser = checkPassword(req.password, userPassword);
});

module.exports = userRoutes;
