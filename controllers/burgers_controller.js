var express = require('express');

var router = express.Router();

var db = require('../models');


//on load, grab every burger from the database


router.get("/", function (req, res) {
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