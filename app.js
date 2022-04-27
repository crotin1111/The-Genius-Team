const express = require('express');
const mysql = require('mysql');
var bodyParser = require("body-parser");

const app = express();

app.set('view engine','ejs'); 
app.engine('ejs', require('ejs').__express);

app.get('/', function (req, res) {
    res.render(__dirname + '/index', {
        title: 'RSA-WOW'
    }); 
});
app.get('/news', function (req, res) {
        res.render(__dirname + '/news', {
            title: 'RSA-WOW'
        }); 
});
app.get('/info', function (req, res) {
    res.render(__dirname + '/info', {
        title: 'RSA-WOW'
    }); 
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/api/news', urlencodedParser, function (req, res) {
    var connection = mysql.createConnection({
        host: '45.11.89.210',
        user: 'root',
        password: 'rsadatabase2022',
        database: 'rsadatabase'
      })
    
    connection.connect();

    connection.query('SELECT * FROM wownews', (error, results, fields) => {
        if(error){
            res.status(500).send(`500 Internal Service Error (MySQL) : ${error.message}`)
            return;
        }

        if(results){
            res.status(200).send(results);
        }
    })
})

app.post('/api/news/post',urlencodedParser, function (req, res) {
    var connection = mysql.createConnection({
        host: '45.11.89.210',
        user: 'root',
        password: 'rsadatabase2022',
        database: 'rsadatabase'
      })
    
    connection.connect();

    connection.query(`INSERT INTO wownews(title, content, author) VALUES ('${req.body.name}','${req.body.content}','${req.body.author}')`, (error, results, fields) => {
        if(error){
            res.status(500).send(`500 Internal Service Error (MySQL) : ${error.message}`)
            return;
        }

        if(results){
            res.status(200).send(results);
        }
    })
})

app.listen(3000);