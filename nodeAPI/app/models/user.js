var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var bcrypt    = require('bcrypt-nodejs');
var validate  = require('mongoose-validator');


var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Not a valid email'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'email should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 90],
    message: 'Minimum 8 characters required'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Password should contain alpha-numeric characters only',
  })
];

var UserSchema = new Schema({
  name : { type: String, required:true, validate: nameValidator },
  email : { type: String, lowercase: true, unique: true, required: true, validate: emailValidator },
  password : { type: String, required: true, validate: passwordValidator, select: false },
  _created_at : {type:Date,default:Date.now}
});

UserSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err)  return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
