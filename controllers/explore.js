const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// GET /explore - shows a form to users to search through
// Trefle's global plant database; renders query results 
router.get("/index", (req, res) => {
    res.send("explore page")
})

// GET /explore/:id - lists more info about a plant + any comments
// show form to create a new comment and a option to save the plant 
// to a user's garden if user is logged in
router.get("/:id", (req, res) => {
    res.send("more details about a plant")
})

// POST /explore/:id/comments - posts comments if user is logged in
router.post("/:id/comments", isLoggedIn, (req, res) => {
    res.send("comment data to db")
})

module.exports = router