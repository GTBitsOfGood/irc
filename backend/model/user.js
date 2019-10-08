//
// Header for model/user.js
//

const mongoose = require('mongoose');
const config = require('./../../config');
const permissionsGroupMap = require('../config/permissions-processor').permissionsGroupsMap;

mongoose.connect(config.db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  permissionGroup: {
    type: String,
    required: true,
    default: 'user',
  },
  firstName: {
    type: String,
    required: false,
    default: 'N/A'
  },
  lastName: {
    type: String,
    required: false,
    default: 'N/A'
  }
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;

/**
 *
 * @returns {*}
 */
UserSchema.methods.getPermissionsGroup = function () {
  return permissionsGroupMap[this.permissionGroup];
};

/**
 * Gets the user's permission group
 * @returns {{}}
 */
UserSchema.methods.getPermissionsGroup = function () {
  return permissionsGroupMap[this.permissionGroup];
};

/**
 * Returns a map (javascript dictionary) where every key is a permission the user has
 * @returns {{}}
 */
UserSchema.methods.getPermissionsMap =  function () {
  return this.getPermissionsGroup().permissionMap;
};

UserSchema.methods.hasPermission = function (permission) {
  return this.getPermissionsMap()[permission] != null;
};
UserSchema.methods.getPermissions = function() {
  return Object.keys(this.getPermissionsMap());
};

UserSchema.statics.getCount = async function() {
  return this.countDocuments({});
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
module.exports.__Schema = UserSchema;
