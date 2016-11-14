import express from 'express';

var router = express.Router();

export default () => {

    /**
     * Route for creating a profile
     * The empty string is because this is the base route for this set of routes
     * ex activity
     */
    router.route("/")
        .post((req, res, next) => {
            console.log(req)
        })
        .get((req, res, next) => {

        })
        .delete((req, res, next) => {

        })
        .put((req, res, next) => {

        });

    // Or routes can b created this way.  Using .get .post .put .delete
    // right on router.
    // this route would be api/activity/:activity_id
    // router.get("/:activity_id", (req, res, next) => {
    //
    // });

    // so here we define all routes in the routing file to b root profile
    return router.use("/activity", router);
}
