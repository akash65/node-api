const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    //converting mongoose user to normal object
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    //pushing access & token to user model
    user.tokens.push({ access, token });
    //save user model
    return user.save().then(() => {
        return token;
    })
}

UserSchema.statics.findByToken = function (token) {
    let Users = this;
    let decode;

    try {
        decode = jwt.verify(token, 'abc123')
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject();
        })
    }

    return Users.findOne({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    let Users = this;
    Users.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    })
}

UserSchema.pre('save', (next) => {
    const users = this;
    if (users.isModified('password')) {
        // 10 represents crypt deep increase number value
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(users.password, salt, (err, hash) => {
                users.password = hash;
                //complete middleware to move next
                next();
            })
        })
    } else {
        next()
    }
})

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users }