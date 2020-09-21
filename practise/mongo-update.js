const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/Users', (err, client) => {
    if (err) {
        console.log('db not connected')
    }

    const db = client.db('Users');

    // db.collection('TodoDetails').findOneAndUpdate({
    //     _id: ObjectID('5f5a305559998252b8c2739d')
    // }, {
    //     $set: {
    //         completed: false,
    //         title: 'tested'
    //     }
    // }, {
    //     returnOriginal: true
    // }).then((result) => {
    //     console.log(result)
    // })

    db.collection('UserDetails').findOneAndUpdate({
        _id: ObjectID('5f577e8687376c1f8c85fbf5')
    }, {
        $set: {
            name: 'Lokesh',
            designation: 'Software Engineer'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res)
    })

    client.close()
})