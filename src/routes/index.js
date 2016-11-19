import express from 'express';
var router = express.Router();

const routes = [
    // Anytime we create a new routing file we add it to this list.
    require('./profile').default,
    require('./activity').default,
].forEach((route) => {
    router.use(route());
});

export default router;