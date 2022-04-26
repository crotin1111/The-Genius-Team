const express = require('express');

const app = express();

app.set('view engine','ejs'); 
app.engine('ejs', require('ejs').__express);

app.get('/', function (req, res) {
    res.render(__dirname + '/index'); 
});
app.get('/news', function (req, res) {
        res.render(__dirname + '/news'); 
    });



app.listen(3000);