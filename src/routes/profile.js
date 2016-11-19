import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Profile from '../models/profile'

const router = express.Router();
// Todo: Define secret sauce
const secret = fs.readFileSync('jwt.key');  // get jwt secret key
const saltRounds = 6;

function generateWebToken(user) {
    return jwt.sign({
        iss: 'https://icanhelpyouwiththat.org',
        sub: user.id
    }, secret, {
        expiresIn: '24h'
    })
}

export default () => {

    /**
     * Route for creating a profile
     * The empty string is because this is the base route for this set of routes
     * ex profile
     */
    router.route("")
        .post((req, res, next) => {
            // POST
        })
        .get((req, res, next) => {
            jwt.verify(
                req.get('Authorization'),
                secret,
                {issuer: 'https://icanhelpyouwiththat.org'},
                (err, decoded) => {
                    if (err) {
                        res.send({
                            status: '0401',
                            message: 'Not Authorized',
                            error: err
                        })
                    } else {
                        Profile.findById(req.body.profileid, {attributes: {
                            exclude: ['password']
                        }}).then(profile => {
                            let status,
                                message;

                            if (profile) {
                                status = '0000';
                                message = 'Profile found'
                            } else {
                                status = '0404';
                                message = 'Profile not found'
                            }

                            res.send({
                                status: status,
                                message: message,
                                profile: profile
                            });
                        }).catch(() => {
                            res.send({
                                status: '0500',
                                message: 'Unknown error occured'
                            })
                        })
                    }
                });
        })
        .delete((req, res, next) => {
            // DELETE
        })
        .put((req, res, next) => {
            // PUT
        });

    /**
     * Define /profile/login endpoints
     */
    router.route("/login")
        .post((req, res, next) => {
            Profile.findOne({
                where: {
                    email: req.body.userid
                }
            }).then(user => {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({
                        status: '0500',
                        message: 'Username and Password do not match'
                    })
                }

                res.send({
                    status: '0000',
                    message: 'Authentication successful',
                    token: generateWebToken(user)
                })
            }).catch(err => {
                res.send({
                    status: '0500',
                    message: 'User not found',
                    error: err
                })
            })
        });

    /**
     * Define /profile/create endpoints
     */
    router.route("/create")
        .post((req, res, next) => {
            Profile.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, saltRounds)
            }).then(profile => {
                res.send({
                    status: '0000',
                    message: 'New profile created'
                })
            }).catch((err) => {
                    res.send({
                        status: '0500',
                        message: err
                    })
                });
        })
        .get((req, res, next) => {
            Profile.findAll().then((profiles) => {
                res.send(profiles)
            })
        });

    // Or routes can b created this way.  Using .get .post .put .delete
    // right on router.
    // router.post("", (req, res, next) => {
    //
    // });

    // so here we define all routes in the routing file to b root profile
    return router.use("/profile", router);
}
