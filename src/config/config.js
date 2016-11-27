
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV;

const sequelizeInstance = (
    !env || env === 'development' ? (() => (
        getDatabaseInstance('localhost', 'root', '')
    ))() : env === "production" ? (() =>
        getDatabaseInstance('icanhelpyouwiththat', 'root', 'medco123')
    )() : console.log("Unrecognized enviroment.")
);



export {sequelizeInstance as sequelize, Sequelize as Sequelize};

function getDatabaseInstance (host, username, password) {
    return new Sequelize('ichuwt', username, password, {
        host: host,
        dialect: 'mysql'
    });
}

