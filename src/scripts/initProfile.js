require('../config/config');
import bcrypt from 'bcrypt';
import Profile from '../models/profile'
const saltRounds = 6;

Profile.count({email: 'admin@icanhelpyouwiththat.org'}).then(function (count) {
    if (!count) {
        Profile.create({
            name: 'ichuwt',
            email: 'admin@icanhelpyouwiththat.org',
            password: bcrypt.hashSync("123abc", saltRounds)
        }).then(profile => {
            console.log('created profile: ' + profile.toString())
        }).catch((err) => {
            console.log('Error creating admin');
            console.log(err);
        });
    }
});
