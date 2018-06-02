import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://speggos:foobarfoo@mongo-me1rl.mongodb.net/test');

let db = mongoose.connection;

app.listen(3000, ()=>console.log('Listening on port 3000'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    const error = Error("No endpoint could be found matching that request");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: err.message
    });
});