require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const checkForSession = require('./middlewares/checkForSession')

let { SERVER_PORT, SESSION_SECRET } = process.env

const app = express()


app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 60000 }
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))


app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signOut)
app.get('/api/user', authCtrl.getUser)

app.get('/api/swag', swagCtrl.read)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.deleteItem)

app.get('/api/search', searchCtrl.search)


app.listen(SERVER_PORT, () =>{
    console.log('server running')
})