const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Server has started')
});



app.listen(port, function() {
    console.log(`Server listening at localhost:${port}`);
})