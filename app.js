import express from 'express';
import bodyParser from 'body-parser';
import User from './models/user';
import mongoose from 'mongoose';
import { hashPassword, checkPassword } from "./helpers/crypto";

const app = express();

mongoose.connect('mongodb+srv://speggos:foobarfoo@mongo-me1rl.mongodb.net/test');

let db = mongoose.connection;

app.listen(3000, ()=>console.log('Listening on port 3000'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Get all users
app.get('/users', (req, res) => {
    User.getUsers((err, users) => {
        if (err) {
            throw err;
        }
        return res.json(users)
    })
});

// Get User by ID
app.get('/users/:id', (req, res) => {
    User.getUserById(req.params.id, (err, user) => {
        if (err) {
            throw err;
        }
        if (user === null) {
            return res.status(404).json("User not found")
        }

        return res.json(user);
    });
});

// Add User
app.post('/users', (req, res) => {
    let user = req.body;

    user.password = hashPassword(user.password);

    console.log(user.password);

    User.addUser(user, (err, newUser) => {
        if (err) {
            return console.log(err.message);
        }
        res.send(newUser);
    });
});

// Delete User
app.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id, (err) => {
        if (err) {
            return console.log(err.message)
        }
        res.status(202).json('Success');
    })
});

// Update User
app.patch('/users/:id', (req, res) => {
    User.updateUser(req.params.id, req.body, (err) => {
        if (err) {
            return console.log(err.message)
        }

        res.status(202).json("Success");
    })
});

app.post('/login', (req, res) => {

    const userPassword = User.getUserByEmailOrUsername(req);

    const validUser = checkPassword(req.password, userPassword)
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    //res.json(users);
});