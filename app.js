//------------------IMPORTS 

import 'dotenv/config';
import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";


//------------------    route imports



const app = express();
const port = process.env.PORT
const sessionKey = process.env.SESSION_KEY


// -----------------MIDDLEWARE

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))


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
        // console.log(req.body);
        try {
            const result = await axios.post('http://localhost:3001/register/temp', {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                countryCode: req.body.countryCode,
                tel: req.body.tel
            });
            const tempUserValue = JSON.stringify(result.data);
            console.log(tempUserValue);
            res.cookie('tempUser', tempUserValue).render('register-2',{ user: result.data });
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                res.render('register-1', { error: error.response.data.error })
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
                res.render('register-1', { error: "No response received" })
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                res.render('register-1', { error: "An issue occured, please try again later" })


                // console.error('Error during registration:', error.response);
                // 
                // For other types of errors, send a generic message
                // res.status(500).send('Registration failed. Please try again later.');
            }
        }
    });


app.route('/validate-otp/:_id')
    .get(async (req, res) => {
        const result = await TempUser.findById(req.params._id);
        res.render('register-2', { user: result });
    })
    .post(async (req, res) => {
        const reqOTP = `${req.body.otp1}${req.body.otp2}${req.body.otp3}${req.body.otp4}${req.body.otp5}${req.body.otp6}`
        try {
            const result = await axios.post(
                'http://localhost:3001/register/validate-otp',
                {
                    userId: req.params._id,
                    otp: reqOTP,
                    purpose: 'registration'
                }
            );

            res.render('register-3', { user: result.data.tempUser, tcVersion:'v1.0'});
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                res.render('register-2', { error: error.response.data.error });
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
                res.render('register-2', { error: "No response received" })
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                res.render('register-2', { error: "An issue occured, please try again later" })


                // console.error('Error during registration:', error);
                // res.status(500).send('An error occurred during registration.');

            }
        };
    });


app.route('/password/:_id')
    .get(async (req, res) => {
        const tempUserValue = await TempUser.findById(req.params._id);
        res.render('register-3', {
            user: tempUserValue,
            tcVersion: "v1"
        });
    })
    .post(async (req, res) => {
console.log(req.body);
        try {
            const result = await axios.post('http://localhost:3001/register/password',{
                "_id":req.params._id,
                "password":req.body.password1
            });
            res.status(201).json(result.data)

        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('An error occurred during registration.');

        }
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



async function generateOTP(userId, purposeValue) {
    try {
        const otpValue = (Math.floor(Math.random() * 1000000) + '').padStart(6, '0');
        const otp = new OTP({
            purpose: purposeValue,
            user: userId,
            otp: otpValue,
            verified: false
        });
        const result = await otp.save();
        return result;
    } catch (error) {
        console.error("Error generating OTP:", error);
        throw error;
    }
};


app.listen(port || 3000, () => {
    console.log(`Server started on port ${port}`);
});