const User = require("../models/userModel")

// Function to check whether the user is logged in
async function isUserLoggedIn (req, res, next) {
  try {
    if (!(req.session && req.session.user)) {
      return res.status(401).send({
        error: "Unauthorized Access!"
      });
    }else {
      const user = await User.findOne({ _id : req.session.user._id })
      if(user) {
        next();
      } else {
        req.session.user = null;
        return res.status(401).send({
          error: "Unauthorized Access!"
        });
      }
    }
  } catch(e) {
    res.status(400).send({
      error: e
    })
  }
}


// Function to check whether the user is logged out
function isUserLoggedOut (req, res, next) {
  if (req.session && req.session.user) {
    return res.status(200).send({
      message: "User already Logged In!"
    });
  }
  next();
}

module.exports = {
  isUserLoggedIn,
  isUserLoggedOut
}