import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Profile from '../models/profile'

const router = express.Router();
// Todo: Define secret sauce
const secret = process.env.JWT_SECRET || 'secret sauce';
const saltRounds = 6;

function generateWebToken(user) {
    return jwt.sign({data: user}, secret, {
        expiresIn: 86400
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
            Profile.findOne({
                where: {
                    id: req.body.profileid
                }
            }).then(profile => {
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
            Profile.sync()
                .then(() => {
                    return Profile.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, saltRounds)
                    })
                })
                .catch((err) => {
                    res.send({
                        status: '0500',
                        message: err.errors[0].message
                    })
                });
            res.send({
                status: '0000',
                message: `${req.body.name} was successfully created`
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
