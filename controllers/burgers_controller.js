var express = require('express');

var router = express.Router();

var db = require('../models');

var passport = require("../config/passport");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/home");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function () {

        res.json("/home");
    })
});

// Route for logging user out
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function (req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    }
    else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});

//on load, grab every burger from the database


router.get("/", function (req, res) {
    db.Burgers.findAll({

    }).then(function (data) {
        //re renders the home page and grabs data to be filled

        res.render("login", { burgers: data });
    })
})
router.get("/signup", function (req, res) {
    res.render("signup");
})
router.get("/login", function (req, res) {
    res.render("login");
})
router.get("/home", function (req, res) {
    db.Burgers.findAll({

    }).then(function (data) {
        //re renders the home page and grabs data to be filled

        res.render("index", { burgers: data });
    })
})
router.post("/add-burger", function (req, res) {
    db.Burgers.create({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    }).then(function (data) {
        //re renders the home page
        res.render("index");
    })
})
router.put("/update/:id", function (req, res) {
    db.Burgers.update({
        devoured: req.body.devoured,

    }, {
            where: {
                id: req.params.id
            }
        }
    ).then(function (data) {
        //re renders the home page

        res.render("index")
    })
})
router.delete("/delete/:id", function (req, res) {
    db.Burgers.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        //re renders the home page

        res.render("index");
    })
})


module.exports = router;