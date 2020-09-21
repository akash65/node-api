const server = require('./middleware/server');
const express = require('express');

const app = express();
const port = 4000;

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    // next()
})

app.get('/', (req, res) => {
    res.send('Hey')
}, (err) => {
    res.send({
        errorMessage: 'not found'
    })
})

app.get('/home', (req, res) => {
    res.send('Home page')
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})
