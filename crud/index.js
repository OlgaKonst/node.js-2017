const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

let orders = [
  {
    id: 1,
    name: 'pen',
    cost: 24,
  },
  {
    id: 2,
    name: 'note',
    cost: 40,
  },
];
const port = 1337;

const app = express();

app.use(bodyParser.json());

app.get('/order/:id', (req, res) => {
  const order = orders.filter(item => item.id === +req.params.id);
  if (order.length !== 0) {
    res.status(200).json(order);
  } else {
    throw new Error(`${req.params.id} is not exist!`);
  }
});

app.post('/order', (req, res) => {
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    body =  body.toString();
    req.body.item = body;
    orders.push(req.body.item);
 });

  res.status(200);
  res.send('success');
});

app.put('/order/:id', (req, res) => {
  orders.forEach((item) => {
    if (item.id === +req.params.id) {
      console.log(`Modified item with id = ${item.id} `);
    }
  });
});

app.delete('/order/:id', (req, res) => {
  console.log('delete');
  const id = +req.params.id;
  orders = orders.filter(item => item.id !== id);
  console.log('orders', orders);
});

app.use((req, res, next) => {
  res.status(404);
});

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err.stack);
});

http.createServer(app).listen(port, 'localhost');

