module.exports = function (name) {
  return `
    
    
const router = require("express").Router();
const passport = require("passport");

const isAuthenticated = require("../middleware/${name}Auth");
    

router.get(
  '/login',
  passport.authenticate("${name}-github"),
  (req, res) => {
    return res.send(req.user);
  }
);

router.get("/login/callback", passport.authenticate("${name}-github"), (req, res) => {
  res.send(req.user);
});

router.get("/logout", isAuthenticated, (req, res) => {
  req.logout();
  res.send("logged out");
});

module.exports = router;

    `;
};
