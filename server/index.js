require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const controller = require('./products_controller');

//get confidential variables from .env
const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   console.log("Connected to database");
}).catch(err => console.log(err));

// remember: we are exporting one BIG object when we require products_controller
// How do we access an object's methods? REMEMBER NOT TO INVOKE!!!!
app.get('/api/products', controller.getAll);
app.get('/api/products/:id', controller.getOne);
app.put('/api/products/:id', controller.update);
app.post('/api/products', controller.create);
app.delete('/api/products/:id', controller.delete);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));