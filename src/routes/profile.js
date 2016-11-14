import express from 'express';
import Profile from '../models/profile'

var router = express.Router();

export default () => {

    /**
     * Route for creating a profile
     * The empty string is because this is the base route for this set of routes
     * ex profile
     */
    router.route("")
        .post((req, res, next) => {
            console.log(req)
        })
        .get((req, res, next) => {
            console.log(req);
        })
        .delete((req, res, next) => {

        })
        .put((req, res, next) => {

        });

    // Or routes can b created this way.  Using .get .post .put .delete
    // right on router.
    // router.post("", (req, res, next) => {
    //
    // });

    // so here we define all routes in the routing file to b root profile
    return router.use("/profile", router);
}
