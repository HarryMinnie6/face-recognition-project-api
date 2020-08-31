const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const handleApiCall = require('./handleApiCall')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Harry',
      password : '',
      database : 'facial-recognition'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express()

app.use(bodyParser.json())
app.use(cors())


// const dataBase = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: "john@gmail.com",
//             password: "cookies",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '456',
//             name: 'mike',
//             email: 'mike@gmail.com',
//             password: 'watermelon',
//             entries: 0,
//             joined: new Date()
//         },
//     ]
// }

app.get('/', (req, res) =>{
    res.send(dataBase.users)
})

//sign in
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )

//registering
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)} )

app.put("/image", (req, res) => {Image.handleImage(req, res, db)} )
app.post("/imageurl", (req, res) => {Image.handleApiCall(req, res,)} )



app.post('/imageurl', (req, res) => {handleApiCall.handleApiCall(req, res, db)} )

const PORT = process.env.PORT
app.listen(3000, () => {
    console.log('app is running');
})

