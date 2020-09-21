const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Users', (err, client) => {
    if (err) {
        console.log('unable to connect DB');
    }
    console.log('connected to mongoDB');
    const db = client.db('Users');

    // db.collection('UserDetails').insertOne({
    //     name: 'lokesh',
    //     age: 25,
    //     designation: 'web developer'
    // }, (err, result) => {
    //     if (err) {
    //         console.log('unable to create collection')
    //     }

    //     console.log('collection created successfully', result.ops, undefined, 0)
    // })
    db.collection('UserDetails').find().toArray().then((result) => {
        console.log('user details', JSON.stringify(result, undefined, 2))
    })

    db.collection('UserDetails').find({
        _id: new ObjectID('5f5875b9516ac14fcc379eed')
    }).toArray().then((res) => {
        console.log('filtered documents', JSON.stringify(res, undefined, 2))
    }, (err) => {
        console.log('No data matched', err)
    })
    client.close()
})