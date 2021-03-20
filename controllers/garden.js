const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// GET /garden - shows all user's saved plants from
// Trefle's global plant database with options to delete a plant
// from user's garden and to read more about a plant
// router.get("/index", isLoggedIn, (req, res) => {
router.get("/index", (req, res) => {
    res.send("welcome to my garden!")
})

// GET /garden/:id - lists more info about a plant + any notes
// show form to create a new note and a option to delete the plant 
// from user's garden if user is logged in
// router.get("/:id", isLoggedIn, (req, res) => {
router.get("/:id", (req, res) => {
    res.send("more details about my saved plant")
})

// POST /garden/:id/notes - posts notes if user is logged in
// router.post("/:id/notes", isLoggedIn, (req, res) => {
router.post("/:id/notes", (req, res) => {
    res.send("note data to db")
})


// router.post("/new/:id", isLoggedIn, (req, res) => {
router.get("/show/:id", isLoggedIn, (req, res) => {
    res.send("showing specific plant id")
})

module.exports = router