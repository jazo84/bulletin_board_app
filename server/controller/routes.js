var pg = require('pg');

var dbURL = {
  user:process.argv.POSTGRES_USER,
  password: process.argv.POSTGRES_PASSWORD,
  database:'bulletinboard',
  host:'localhost',
  port: 5432
};

var pgClient = new pg.Client (dbURL);

pgClient.connect();

var express = require ('express');
var path = require ('path');

var router = express.Router();

router.get('/', function (req,res){
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/messages', function (req,res){
  res.sendFile(path.join(__dirname, '../../client/public/view_messages.html'));
});

router.post('/api/message', (req, res) =>{
  console.log(req.body)
  if(req.body.messageTitle !== '' && req.body.messageBody !== ''){
    var insertMessage = "INSERT INTO messages (title, body) VALUES ($1, $2)";
    pgClient.query(insertMessage, [req.body.messageTitle, req.body.messageBody], (error, insertMessageRes)=>{
      if (error) {
        res.json(error)
      } else {
        res.json(insertMessageRes)
      }
    });
  } else if (req.body.messageTitle === '' || req.body.messageBody ==='') {
    res.json("null_message")
  }
});

router.get('/api/messages', (req, res)=>{
  var query = "SELECT * FROM messages";
  pgClient.query(query, (error, queryRes)=>{
    if(error){
      res.json(error)
    } else {
      res.json({messages: queryRes.rows})
    }
  });
});

module.exports = router;
