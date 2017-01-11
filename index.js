var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.end('Timestamp API Project 0.0.1');
}).listen(port, () => {
    console.log('Timestamp app listening on port '+port+'!');
});