var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.end('Timestamp API Project 0.0.1');
}).listen(8080);