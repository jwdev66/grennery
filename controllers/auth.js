const express = require("express")
const router = express.Router()
const db = require("../models")
const passport = require("../config/ppConfig")

router.get('/signup', (req, res)=>{
    res.render("auth/signup")
})

router.post('/signup', (req, res)=>{
    res.send("posting sign up page")
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login', passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/home/index",
    failureFlash: "Invalid username and/or password.",
    successFlash: "You are now logged in."
    })
)

router.get("/logout", (req, res)=>{
    req.logout() //! -> flash 
    req.flash("success", "Success! You're logged out.")
    res.redirect("/")
})

module.exports = router