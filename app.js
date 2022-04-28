const express = require('express');
const mysql = require('mysql');
var bodyParser = require("body-parser");

// to make a comment type // or press CTRL + ? 

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);


app.get('/', function (req, res) {
    res.render(__dirname + '/index', { //Requires the auth0 wow login i think to register?
        title: 'RSA-WOW'
    });
});
app.get('/news', function (req, res) {
    res.render(__dirname + '/news', { //Database not yet set up 100%
        title: 'RSA-WOW'
    });
});
app.get('/about-us', function (req, res) {
    res.render(__dirname + '/about-us', { //About us = /Info. I could not set that to about us with a space. Will Require @Rondell to finish that part.
        title: 'RSA-WOW'
    });
});
app.get('/contact-us', function (req, res) {
    res.render(__dirname + '/contact-us', { //requires = Form via database
        title: 'RSA-WOW' 
    });
});



app.get('/api/news', function (req, res) {
    var connection = mysql.createConnection({
        host: '45.11.89.210',
        user: 'root',
        password: 'rsadatabase2022',
        database: 'rsadatabase'
    })

    connection.connect();

    connection.query('SELECT * FROM wownews', (error, results, fields) => {
        if (error) {
            res.status(500).send(`500 Internal Service Error (MySQL) : ${error.message}`)
            return;
        }

        if (results) {
            res.status(200).send(results);
        }
    })
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/news/post', urlencodedParser, function (req, res, next) {
    var connection = mysql.createConnection({
        host: '45.11.89.210',
        user: 'root',
        password: 'rsadatabase2022',
        database: 'rsadatabase'
    })

    connection.connect();

    connection.query(`INSERT INTO wownews(title, content, author) VALUES ('${req.body[0].name}','${req.body[0].content}','${req.body[0].author}')`, (error, results, fields) => {
        if (error) {
            res.status(500).send(`500 Internal Service Error (MySQL) : ${error.message}`)
            console.log(req.body[0]);
            // console.log(error);
            return;
        }

        if (results) {
            res.status(200).send(results);
        }
    })

    // console.log(req.body);

    // Currently logs {} which is empty data.
    //
    // should log something similar to this.
    //
    // {
    //     name: 'example',
    //     content: 'example',
    //     author: 'author'
    // }
})

app.listen(3000);