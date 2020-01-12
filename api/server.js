const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session); //store session in db
const knex = require('../database/dbConfig');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const userRouter = require('../users/users-router');

const sessionConfiguration = {
    //session storage options
    name: 'chipsnsalsa',

    //secret encryption, must be environment variable
    secret: 'keep it secret, keep it safe!',
    saveUninitialized: false, //affects GDPR laws - in production, set to false
    resave: false,
    //how to store
    store: new knexSessionStore({
        //remember to use new keyword
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'id',
        clearInterval: 1000 * 60 *10
    }),
    //cookie options
    cookie: {
        maxAge: 1000 * 60 *10,
        secure: false, //if false, cookie is sent over HTTP, if true sent of HTTPS
        httpOnly: true //if true, JS cannot access the cookie
    }
}

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration)) //add req.session object

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>Jenn Hott-Leitsch</h1>
        <p>Authentication Challenge</p>
    `);
});


module.exports = server;
