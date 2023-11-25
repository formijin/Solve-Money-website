import Express from "express";
import axios from 'axios';


const router = Express.Router();

router.route('/')
    .get(async (req, res) => {
        if (req.query.change) {
            res.render('register-1', { tempUser: JSON.parse(req.cookies.tempUser) });
        } else if (req.cookies.tempUser) {
            res.render('register-2', { tempUser: JSON.parse(req.cookies.tempUser), message: req.flash('message') });
        } else {
            res.render('register-1', { message: req.flash('message') });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await axios.post('http://localhost:3001/register/temp', {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                countryCode: req.body.countryCode,
                tel: req.body.tel
            });
            const tempUserValue = JSON.stringify(result.data);
            // console.log(tempUserValue);
            res.cookie("tempUser", tempUserValue).render('register-2', { tempUser: result.data });

        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                req.flash('message', error.response.data.error);
                res.redirect('/register');
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
                req.flash('message', "No response received");
                res.redirect('/register')
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                req.flash('message', "An issue occured, please try again later");
                res.redirect('/register')


                // console.error('Error during registration:', error.response);
                // 
                // For other types of errors, send a generic message
                // res.status(500).send('Registration failed. Please try again later.');
            }
        }
    });

router.route('/validate-otp/')
    .post(async (req, res) => {
        const tempUser = JSON.parse(req.cookies.tempUser);
        const reqOTP = `${req.body.otp1}${req.body.otp2}${req.body.otp3}${req.body.otp4}${req.body.otp5}${req.body.otp6}`;

        try {
            const result = await axios.post(
                'http://localhost:3001/register/validate-otp',
                {
                    userId: tempUser._id,
                    otp: reqOTP,
                    purpose: 'registration'
                }
            );

            res.render('register-3', { user: result.data.tempUser, tcVersion: 'v1.0' });
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                console.error('Status Code:', error.response.status);
                console.error('Response Data:', error.response.data);
                req.flash('message', error.response.data.error);
                res.redirect('/register')
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received');
                res.render('register-2', { user: tempUser, error: "No response received" })
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                res.render('register-2', { user: tempUser, error: "An issue occured, please try again later" })


                // console.error('Error during registration:', error);
                // res.status(500).send('An error occurred during registration.');

            }
        };
    });


router.route('/password/:_id')
    .post(async (req, res) => {
        try {
            const result = await axios.post(
                'http://localhost:3001/register/password',
                {
                    _id: req.params._id,
                    password: req.body.password
                }
            )
            console.log(result.data);
            const accessToken = result.data.token
            res.cookie('token', accessToken, { httpOnly: true, secure: false }).render('user-reg-sucess');


        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('An error occurred during registration.');

        }
    });




export default router;