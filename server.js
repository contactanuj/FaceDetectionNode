const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg', 
  connection: {
    host : '127.0.0.1',
    user : 'anujj',
    password : '',
    database : 'smart-brain'
  }
});

;

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => db.select('*').from('users').then(data => res.json(data)));
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGET(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageURL', (req,res) => image.handleApiCall(req, res));
app.listen(3001, () => {
    console.log("App is currently running at port 3001.");
});