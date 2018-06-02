import db_address from './constants';

const mongoose = require('mongoose');
mongoose.connect(db_address);

module.exports = mongoose;