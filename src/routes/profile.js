import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Profile from '../models/profile'

const router = express.Router();
// Todo: Better handle JWT key
const secret = fs.readFileSync('jwt.key');  // get jwt secret key
const saltRounds = 6;

/**
 * Helper function, generates webtoken
 * @param user
 * @returns {*}
 */
function generateWebToken(user) {
    return jwt.sign({
        iss: 'https://icanhelpyouwiththat.org',
        sub: user.id
    }, secret, {
        expiresIn: '24h'
    })
}

/**
 * Helper function, verifies token
 * @param token
 * @param successCallBack
 * @param errorCallBack
 */
function verifyToken(authHeader, successCallBack, errorCallBack) {
    jwt.verify(authHeader.split(' ')[1], secret, {
        issuer: 'https://icanhelpyouwiththat.org'
    }, (err, decoded) => {
        decoded ? successCallBack(decoded) : errorCallBack(err);
    });
}

export default () => {

    /**
     * Route for creating a profile
     * The empty string is because this is the base route for this set of routes
     * ex profile
     */
    router.route("")
        .post((req, res, next) => {
                return Profile.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, saltRounds)
                }).then(profile => {
                    res.status(200).send({
                        status: '0000',
                        message: 'New profile created'
                    })
                }).catch((err) => {
                    res.status(500).send({
                        status: '0500',
                        message: err
                    })
                })
        });

    router.route("/:id").get((req, res, next) => {
            verifyToken(req.get('Authorization'),
                function successCallBack(decoded)  {
                    let id = Number.isInteger(Number.parseInt(req.params.id)) ? req.params.id : decoded.sub;

                    Profile.findOne({_id: id}, {
                        password: 0
                    }).then(profile => {
                        res.status(profile ? 200 : 404).send({
                            status: profile ? '0000' : '0404',
                            message: profile ? 'Profile found' : 'Profile not found',
                            profile: profile
                        });
                    }).catch(() => {
                        res.status(500).send({
                            status: '0500',
                            message: 'Unknown error occured'
                        })
                    })
                },
                function errorCallBack(err) {
                    res.status(401).send({
                        status: '0401',
                        message: 'Not Authorized',
                        error: err
                    })
                }
            );
        })
        .delete((req, res, next) => {
            verifyToken(req.get('Authorization'),
                function successCallBack(decoded) {
                    if (decoded.sub != req.params.id) {
                        res.status(401).send({
                            status: '0401',
                            message: 'Not authorized'
                        });
                    } else {
                        Profile.findById(req.params.id)
                            .then(user => {
                                user.destroy({force: true});
                            });
                        res.status(204).send({
                            status: '0204',
                            message: 'Item deleted'
                        })
                    }
                },
                function errorCallBack(err) {
                    res.status(500).send({
                        status: '0500',
                        message: 'Unknown error',
                        error: err
                    })
                }
            )
        })
        .put((req, res, next) => {
            verifyToken(req.get('Authorization'),
                function successCallBack(decoded) {
                    if (decoded.sub != req.params.id) {
                        res.status(401).send({
                            status: '0401',
                            message: 'Not authorized'
                        });
                    } else {
                        Profile.findOne({_id: id})
                            .then(user => {
                                let keys = Object.keys(req.body);
                                keys.forEach(key => {
                                    user[key] = req.body[key]
                                });
                                user.save()
                                    .then(() => {
                                        res.status(204).send({
                                            status: '0204',
                                            message: 'Profile updated'
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            status: '0500',
                                            message: 'Something went wrong',
                                            error: err
                                        })
                                    })
                            });
                    }
                },
                function errorCallBack(error) {
                    // Handle token failure
                }
            )
        });

    /**
     * Define /profile/login endpoints
     */
    router.route("/login")
        .post((req, res, next) => {
            Profile.findOne({email: req.body.userid}).then(user => {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(500).send({
                        status: '0500',
                        message: 'Username and Password do not match'
                    })
                }

                res.status(200).send({
                    status: '0000',
                    message: 'Authentication successful',
                    profile: user,
                    token: generateWebToken(user)
                })
            }).catch(err => {
                res.status(500).send({
                    status: '0500',
                    message: 'User not found',
                    error: err
                })
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
