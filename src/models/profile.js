// The Sequelize is for typing and options and sequelize if for our instance.
import {Sequelize, sequelize} from '../config/config';

var Profile = sequelize.define('PROFILE', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        field: 'ID',
        primaryKey: true,
        validate: {
            notNull: true
        }
    },
    name: {
        type: Sequelize.STRING(150),
        field: 'name'
    },
    karmaPoints: {
        type: Sequelize.INTEGER,
        field: 'karma_points'
    },
    email: {
        type: Sequelize.STRING(150)
    },
    mobilePhone: {
        type: Sequelize.STRING(25),
        field: 'mobile_phone'
    },
    location: {
        type: Sequelize.STRING(25),
        field: 'geo_location'
    },
    zip: {
        type: Sequelize.STRING(15),
        field: 'zip_code'
    },
    type: {
        type: 'TINYINT'
    },
    mission: {
        type: Sequelize.STRING(500)
    },
    admin: {
        type: Sequelize.BOOLEAN
    },
    likes: {
        type: Sequelize.INTEGER
    },
    invites: {
        type: Sequelize.INTEGER
    },
    password: {
        type: Sequelize.STRING(50)
    },
    linkedAccount: {
        type: Sequelize.STRING(500)
    },
    status: {
        type: "TINYINT"
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// These are class methods.
Profile.create = (name, email) => (
    // Everything is a promise just return it.
    Profile.build({name: name, email: email}).save()
    // or maybe we increment liek 2
    // Profile.build({name: name, email: email}).incrementLike().save()
);

// These are instance methods done on the proto
Profile.prototype.incrementLike = () => {
    this.like++;
};

export default Profile;