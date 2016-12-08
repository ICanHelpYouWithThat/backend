var mongoose = require("mongoose");
/**
 * The Messages Model<br />
 * Holds the schema for all messages on the platform
 *
 * @class Models - Messages
 */
const profileSchema = mongoose.Schema({
    name: {type: String, required: true, index: true},
    email: {type: String, required: true, index: true, unique: true},
    karmaPoints: {type: String, index: true},
    mobilePhone: String,
    location: String,
    zip: String,
    type: {type: String, enum: ['individual', 'organization.'], required: true, default: 'individual'},
    admin: {type: Boolean, default: false},
    mission: String,
    likes: {type: Number, default: 0},
    invites: {type: Number, default: 0},
    password: {type: String, required: true, select: false},
    linkedAccounts: [String],
    status: Boolean,
    created: {type: Date, required: true},
    modified: {type: Date, required: true}
});

profileSchema.pre("validate", function (next) {
    this.modified = Date.now();
    this.created = !this.created ? Date.now() : this.created;

    next();
});

export default mongoose.model("Profile", profileSchema);
