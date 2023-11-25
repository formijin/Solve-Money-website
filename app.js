//------------------IMPORTS 

import 'dotenv/config';
import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';


//------------------    route imports
import RegitrationRoutes from './routes/register.js'



const app = express();
const port = process.env.PORT

// -----------------MIDDLEWARE

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// routes middleware
app.use('/register', RegitrationRoutes);


//------------------ROUTES
app.get('/', (req, res) => {
    res.render('home')
});



app.route('/dashboard')
    .get((req, res) => {
        res.render('dashboard');
    });
// app.route('/login')
//     .get(async (req, res) => {
//         res.render('login');
//     })
//     .post(passport.authenticate('local', {
//         successRedirect: '/dashboard',    // redirect to dashboard if successful
//         failureRedirect: '/login',        // redirect back to login page if not
//         failureFlash: true                // optionally use flash messages for errors
//     }));




app.listen(port || 3000, () => {
    console.log(`Server started on port ${port}`);
});