//------------------IMPORTS 

import 'dotenv/config';
import express from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";

//------------------    authentication imports
import session from "express-session";
import passport from "passport";
import passprtLocalMongoose from "passport-local-mongoose";


//------------------    model imports
import User from './models/user.js';
import TempUser from "./models/temp-user.js";


//------------------    route imports



const app = express();
const port = process.env.PORT
const sessionKey = process.env.SESSION_KEY


// -----------------MIDDLEWARE

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

//------------------    authentication and session midleware
app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.ENVIRONMENT === 'production' }
}))
app.use(passport.initialize());
app.use(passport.session());

//------------------    route middleware


//------------------DB CONNECTION
try {
    mongoose.connect("mongodb://127.0.0.1:27017/solveDB");
    console.log("Connected to mongoDB");
} catch (error) {
    console.log(error);
};

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//------------------ROUTES
app.get('/', (req, res) => {
    res.render('home')
});

//------------------    register route
app.route('/register')
    .get(async (req, res) => {
        res.render('register-1');
    })
    .post(async (req, res) => {
        try {
            const tempUser = new TempUser({
                firstName: req.body.fName,
                lastName: req.body.lName,
                email: req.body.email,
                phoneNumber: {
                    countryCode: req.body.countryCode,
                    number: req.body.tel,
                    msisdn: `${req.body.countryCode}${req.body.tel}`
                },
            });
            const result = await tempUser.save();
            res.render('register-2', { user: result });
        } catch (error) {
            console.error('Error during registration:', error);

            // Check for duplicate key error (code 11000 in MongoDB)
            if (error.code === 11000) {
                return res.status(400).send('Email or phone number already registered.');
            }

            // For other types of errors, send a generic message
            res.status(500).send('Registration failed. Please try again later.');
        }
    });

app.route('/login')
    .get(async (req, res) => {
        res.render('login');
    })

app.listen(port || 3000, () => {
    console.log(`Server started on port`);
});