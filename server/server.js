const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { AnimalDetails } = require('./models/animals')
const { Users } = require('./models/users');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = 5500;
//using model to create details
// const animals = new AnimalDetails({
//     name: ' Rhino1 ',
//     type: ' ',
//     gender: 'male',
//     completed: true,
//     completedAt: new Date()
// });

// animals.save().then((res) => {
//     console.log(JSON.stringify(res, undefined, 2));
// }, (err) => {
//     console.log(err)
// })

app.use(bodyParser.json())
app.use(cors({ origin: true }));

app.get('/animals', (req, res) => {
    AnimalDetails.find().then((result) => {
        res.send({ result, status: true })
    }, (err) => {
        res.send(err)
    })
})

app.get('/animals/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id')
    }

    AnimalDetails.findById(id).then((result) => {
        if (!result) {
            return res.status(404).send({ result })
        }
        res.status(200).send({ result })
    })

})

app.post('/create', (req, res) => {
    const details = new AnimalDetails({
        name: req.body.name,
        type: req.body.type,
        gender: req.body.gender,
    });
    details.save().then((data) => {
        res.send(data);
    }, (err) => {
        console.log(err)
        res.status(400).send(err)
    })
    // console.log(req.body)
})

app.delete('/animals/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not exist')
    }

    AnimalDetails.findByIdAndDelete(id).then((data) => {
        res.send(data)
    }).catch((err) => {
        return res.status(404).send(err)
    })
})

app.patch('/animals/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'type', 'gender'])
    const animals = new AnimalDetails(body);

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }

    animals.findByIdAndUpdate(id, { $set: body }, { new: true }).then((data) => {
        if (!data) {
            res.status(404).send()
        }

        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err)
    })

})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new Users(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.post('users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    Users.findByCredentials(body.email, body.password).then((user) => {
        // res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        res.status(400).send();
    })
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
    // const token = req.header('x-auth');
    // Users.findByToken(token).then((user) => {
    //     if (!user) {
    //         // return Promise.reject()
    //     }
    //     res.send(user)
    // }).catch((err) => {
    //     res.status(401).send()
    // });
})

app.listen(port, () => {
    console.log(`server started http://localhost:${port}`)
})

module.exports = { app }