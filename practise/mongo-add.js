const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Todos', (err, client) => {
    if (err) {
        console.log('Unable to connect to server')
    }

    const db = client.db('TodoDetails');
    db.collection('TodoDetails').insertOne({
        title: 'Test',
        desc: 'testing purpose'
    }).then((result) => {
        console.log('Added successfully', result.ops, undefined, 2)
    })

    client.close()
})