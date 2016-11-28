import mongoose from 'mongoose';
const env = process.env.NODE_ENV;

const mongoHost = (!env || env === 'development' || !env ? "localhost/ichuwt" : "mongo-master/ichuwt");

mongoose.Promise = Promise;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoHost, {
        w: "majority",
        fsync: true,
        journal: true,
        debug: true
    });
}

export {mongoose}