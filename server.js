const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

const Game = require('./helpers/game');

const game = new Game({});

app.get('/tickets', function (req, res) {
  const { count } =  req.query;
  const tickets = game.getTickets(count);
  res.send(tickets);
});

app.post('/draw', function (req, res) {
  const { currentBalls } = req.body;
  const nextBall = game.getNextBall(currentBalls);
  res.send({ nextBall });
});

app.post('/verify', function (req, res) {
  const bingo = game.verify(req.body);
  res.send({ bingo });
});



app.listen(process.env.PORT || 8080);
