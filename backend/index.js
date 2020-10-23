const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const routeUsers = require('./src/routes/users.js');
const routeContacts = require('./src/routes/contacts.js');

app.use(bodyParser.json());

app.use(routeUsers);
app.use(routeContacts);

app.listen(3000, () => {
  console.log('Backend is running!');
})