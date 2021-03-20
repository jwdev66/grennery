const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// GET /explore - shows a form to users to search through
// Trefle's global plant database; renders query results 
router.get("/index", (req, res) => {
    res.send("explore page")
})

// GET /explore/:id - lists more info about a plant and
// an option to save the plant to a user's garden 
// if user is logged in
router.get("/:id", (req, res) => {
    res.send("more details about a plant")
})

module.exports = router