
import express from 'express';
import webpack from 'webpack';
import os from 'os';
import cluster from 'cluster';


const config = require('../webpack/webpack.config.js');

const port = 3000;


config.plugins.unshift(
    new webpack.HotModuleReplacementPlugin()
);


if(cluster.isMaster) {
    // Workers always n-1
    let numWorkers = 1;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    let app = express();

    //helmet helps secure apps by setting appropriate headers
    let helmet = require('helmet');
    app.use(helmet());

    let bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(require('./routes').default);

    // app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    let server = app.listen(port, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests on port '+ port);
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*.icanhelpyouwiththat.org');
            return next();
        });
    } else {
        let compiler = webpack(config);

        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            return next();
        });

        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log
        }));
    }
}
