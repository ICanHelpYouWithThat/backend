
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV;

var sequelizeInstance;

getDatabaseInstance();
console.log(process.env);
export default () => (
    !env || env === 'development' ? (() => ({
        db: getDatabaseInstance()
    }))() : env === "production" ? (() => {

    })() : console.log("Unrecognized enviroment.")
)

export {sequelizeInstance as sequelize, Sequelize as Sequelize};

function getDatabaseInstance () {
    return !!sequelizeInstance ? sequelizeInstance : (() => {
        console.log("Initializing ichuwt mysql...");
        return sequelizeInstance = new Sequelize('ichuwt', 'root', 'medco123',{
            host: '104.197.138.145',
            dialect: 'mysql'
        });
    })()
}

