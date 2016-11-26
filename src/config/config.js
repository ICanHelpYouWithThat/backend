
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV;

var sequelizeInstance;

getDatabaseInstance();

export default () => (
    !env || env === 'development' ? (() => ({
        db: getDatabaseInstance('localhost', 'root', '')
    }))() : env === "production" ? (() => {
        db: getDatabaseInstance('icanhelpyouwiththat', 'root', 'medco123')
    })() : console.log("Unrecognized enviroment.")
)

export {sequelizeInstance as sequelize, Sequelize as Sequelize};

function getDatabaseInstance (host, username, password) {
    return !!sequelizeInstance ? sequelizeInstance : (() => {
        console.log("Initializing ichuwt mysql...");
        return sequelizeInstance = new Sequelize('ichuwt', username, password,{
            host: host,
            dialect: 'mysql'
        });
    })()
}

