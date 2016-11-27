
import express from 'express';
import webpack from 'webpack';
import cluster from 'cluster';
import cors from 'express-cors';
import log from './libs/log';
import VitalSigns from 'vitalsigns';
const vitals = new VitalSigns({
    "httpHealthy": 200,
    "httpUnhealthy": 503
});

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
    app.use(function (req, res, next) {
        console.log('API hit');
        next();
    })
    app.use(cors({
        "allowedOrigins": [
            "*.icanhelpyouwiththat.org:*",
            "*.icanhelpyouwiththat.org",
            "icanhelpyouwiththat.org",
            "*"
        ]
    }));

    app.use(log.requestLogger);
    app.use(log.errorLogger);
    let bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Setup vital monitoring.
    //
    vitals.monitor("cpu");
    vitals.monitor("mem", {"units": "MB"});
    vitals.monitor("tick");

    vitals.unhealthyWhen("cpu", "usage").greaterThan(90);
    vitals.unhealthyWhen("tick", "maxMs").greaterThan(1000);

    app.get("/", function (req, res, next) {
        let report = vitals.getReport();
        delete report.mem;

        if (report.healthy) {
            res.status(200).send(report);
        } else {
            res.status(503).send(report);
        }
    });

    app.get("/favicon.ico", function (req, res, next) {
            res.status(200).send();
    });

    app.use(require('./routes').default);

    // app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    let server = app.listen(port, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests on port '+ port);
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'icanhelpyouwiththat.org');
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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
