const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")

// POST /garden/new - posts saved plant from query to garden if user is logged in
router.post("/new/:id", isLoggedIn, (req, res) => {
    let id = req.params.id
    db.plant.create({
        name: req.body.name,
        scientificName: req.body.scientificName,
        image: req.body.image,
        slug: req.body.slug,
        userId: id
    })
    .then((savedPlant) => {
        console.log("Here's the saved plant:", savedPlant)
        res.redirect(`/garden/index/${id}`)
    })
    .catch(err => {
        console.log("errrr saving plant to garden:", err)
    })
})

// GET /garden - shows all user's saved plants from
// Trefle's global plant database with options to delete a plant
// from user's garden and to read more about a plant
router.get("/index/:id", isLoggedIn, (req, res) => {
    db.user.findOne({
        include: [db.plant],
        where: { id: req.params.id }
    })
    .then((user) => {
        console.log(user)
        res.render("garden/index", { user })
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})

// GET /garden/:id - lists more info about a plant + any notes
// show form to create a new note and a option to delete the plant 
// from user's garden if user is logged in
router.get("/plant/:id", isLoggedIn, (req, res) => {
    res.send("more details about my saved plant")
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