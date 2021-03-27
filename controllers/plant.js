const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// GET /plant/:id - delete user's plant
router.delete("/:id", isLoggedIn, (req, res) => {
    let id = req.params.id
    let userId = req.user.id
    console.log(userId)
    db.plant.destroy({
        include: [db.user],
        where: { id: id }
    })
    .then((deletedPlant) => {
        console.log("deleting saved plant:", deletedPlant)
        res.redirect(`/garden/index/${userId}`)
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})

// POST /plant/new/:userId - show form to add new plant to user's garden
router.post("/plant/new/:userId", isLoggedIn, (req, res) => {
    res.send("saving queried plant to garden")
})


module.exports = router