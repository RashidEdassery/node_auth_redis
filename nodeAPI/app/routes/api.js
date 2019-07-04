const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secret = "51adaxaw432w@3red"; // Can be an ENV too

module.exports = function(router) {
  router.post("/register", function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    if (!user.name || !user.email || !user.password) {
      res.json({
        success: false,
        message: "Ensure that Names, email and password fields are entered"
      });
    } else {
      user.save(function(err) {
        if (err) {
          if (err.errors != null) {
            if (err.errors.name) {
              res.json({
                success: false,
                message: err.errors.name.message
              });
            } else if (err.errors.email) {
              res.json({
                success: false,
                message: err.errors.email.message
              });
            } else if (err.errors.password) {
              res.json({
                success: false,
                message: err.errors.password.message
              });
            } else {
              res.json({
                success: false,
                message: err
              });
            }
          } else if (err.errors == null) {
            res.json({
              success: false,
              message: "That email is already taken"
            });
          }
        } else {
          res.json({
            success: true,
            message: "Account registered"
          });
        }
      });
    }
  });

  router.post("/login", function(req, res) {
    var email = req.body.email;
    console.log(req.body.email, req.body.password);
    
    User.findOne({
      email: req.body.email
    })
      .select("name email password _id")
      .exec(function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            success: false,
            message: "User authentication failed"
          });
        } else if (user) {
          if (req.body.password) {
            var validPassword = user.validatePassword(req.body.password);
          } else {
            res.json({
              success: false,
              message: "Password no provided"
            });
          }
          if (!validPassword) {
            res.json({
              success: false,
              message: "Invalid Password"
            });
          } else {
            var token = jwt.sign(
              {
                name: user.name,
                id: user._id
              },
              secret,
              {
                expiresIn: "24h"
              }
            );
            res.json({
              success: true,
              message: "Login Successfull....",
              token: token
            });
          }
        }
      });
  });

  return router;
};
