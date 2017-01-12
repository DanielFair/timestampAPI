var express = require('express');
var moment = require('moment');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var regEx = /[a-z]/gi;

function isDate(date) {
    return ((new Date(date).toString() !== "Invalid Date" && !isNaN(new Date(date)) ));
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
    //res.end('Welcome to the Timestamp API Microservice! To use the API, enter a unix timestamp or natural language date (January 1, 2017) as a parameter in the URL.');
})
app.get('/:dateparam', (req, res) => {
    var dateParam = req.params.dateparam;
    var dateObj = {"unix": '', "natural": ''};
    var dateStr = '';
    var unixFormats = ['X'];

    if(regEx.test(dateParam)) {
        console.log('got a letter in the string');
        if(isDate(dateParam)) {
            var naturalDate = new Date(dateParam);
            console.log('and next');
            dateObj.unix = Math.round((naturalDate.getTime())/1000);
            dateStr = monthArr[naturalDate.getMonth()] + ' ' + naturalDate.getDate() + ', ' + naturalDate.getFullYear();
            dateObj.natural = dateStr;
        }
    }

    if(moment(dateParam, unixFormats, true).isValid() ) {
        console.log('got a unix timestamp');
        var unixTime = Number(dateParam);
    
        dateObj.unix = unixTime;

        //Since we're working with Unix epoch time in seconds, not milliseconds, multiply by 1000
        var fullDate = new Date(unixTime*1000);
        dateStr = monthArr[fullDate.getMonth()] + ' ' + fullDate.getDate() + ', ' + fullDate.getFullYear();
        dateObj.natural = dateStr;
        console.log(dateObj);
    }
    if(dateObj.unix.length == 0) {
        dateObj.unix = null;
        dateObj.natural = null;
    }
    res.end(JSON.stringify(dateObj));
}).listen(port, () => {
    console.log('Timestamp app listening on port '+port+'!');
});