const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/Users', (err, client) => {
    if (err) {
        console.log('unable to connect')
    }
    console.log('server connected')
    const db = client.db('Users');
    db.collection('UserDetails').deleteOne({ name: 'lokesh' }).then((result) => {
        console.log('deleted user', result)
    })

    db.collection('UserDetails').findOneAndDelete({ _id: new ObjectID('5f5875b9516ac14fcc379eed') }).then((res) => {
        console.log('deleted using id', res)
    })
})