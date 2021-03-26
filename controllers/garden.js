const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// GET /garden - shows all user's saved plants from
// Trefle's global plant database with options to delete a plant
// from user's garden and to read more about a plant
router.get("/index", isLoggedIn, (req, res) => {
    res.render("garden/index")
})

// GET /garden/:id - lists more info about a plant + any notes
// show form to create a new note and a option to delete the plant 
// from user's garden if user is logged in
router.get("/:id", isLoggedIn, (req, res) => {
    res.send("more details about my saved plant")
})

// GET /garden/:id - delete user's plant
router.delete("/:id", isLoggedIn, (req, res) => {
    console.log("deleting saved plant")
})

// POST /garden/:id/notes - posts notes if user is logged in
router.post("/:id/notes", isLoggedIn, (req, res) => {
    res.send("note data to db")
})

// GET /garden/:id/edit - show form to update saved plant
router.get("/:id/edit", isLoggedIn, (req, res) => {
    res.send("update data to db")
})

// PUT /garden/:id/edit - updates saved plant to garden
router.put("/:id/edit", isLoggedIn, (req, res) => {
    res.send("update data to db")
})

module.exports = router