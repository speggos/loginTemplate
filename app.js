import express from 'express';
import bodyParser from 'body-parser';
import User from './models/user';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://speggos:foobarfoo@mongo-me1rl.mongodb.net/test?retryWrites=true');

let db = mongoose.connection;

app.listen(3000, ()=>console.log('Listening on port 3000'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/users', (req, res) => {

    const user = req.body;

    User.addUser(user, (err, result) => {

        if (err) {
            return console.log(err.message);
        }

        console.log(user);

        console.log('Here!');

    });
});

app.get('/users', (req, res) => {
    User.getUsers(req.body, (err, users) => {
        if (err) {
            throw err;
        }
        console.log('usrs', users);


        return res.json(users)
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    //res.json(users);
});