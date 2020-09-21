const { ObjectID } = require('mongodb');
const mongoose = require('../server/db/mongoose');
const AnimalDetails = require('../server/models/animals')

let id = '5f5f5062ad939c4bf806890d'
//find
//findOne
//findOneById
AnimalDetails.findOne({
    _id: id
}).then((res) => {
    console.log(res, 'find one')
})

AnimalDetails.findById(id).then((res) => {
    console.log(res, 'find by ID')
})