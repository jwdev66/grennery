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

// GET /plants/new - show form to add new plant to user's garden
// router.get("/:id/new/:userId", isLoggedIn, (req, res) => {
router.post("/:id/new/:userId", (req, res) => {
    res.send("saving queried plant to garden")
})

module.exports = router