//Dependencies
const express = require('express');
const burger = require('../models/burger.js');
const router = express.Router();

//Displays DB
router.get("/", (req, res) => {
    burger.selectAll((data) => {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//Post a new burger
router.post("/api/burgers", (req, res) => {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, req.body.devoured
        ], (result) => {
            res.json({ id: result.insertId });
        });
});

//Update burger state
router.put("/api/burgers/:id", (req, res) => {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    }
    );
});

router.delete("/api/burgers/:id", (req, res) => {
    var condition = "id = " + req.params.id;
    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;