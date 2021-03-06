const express = require("express")
const router = express.Router()
const db = require("../models")
const passport = require("../config/ppConfig")

router.get('/signup', (req, res)=>{
    res.render("auth/signup")
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user input:', req.body)
    // if it does, throw an error message
    // otherwise create a new user and store them in the db
    db.user.findOrCreate({ // check if that email is already in db
        where: {username: req.body.username},
        defaults: {
            email: req.body.email, 
            username: req.body.username, 
            password: req.body.password,
        }
    }) // create new user if email wasn't found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log(`just created the following user:`, createdUser)
            passport.authenticate("local", {
                successRedirect: "/explore/index/",
                successFlash: "Account created and logged in!"
            })(req, res) // IIFE = immediate invoked function
        } else {
            console.log(' An account associated with that email address already exists! Did you mean to login?')
            res.redirect("/auth/login")

        }
    })
    .catch(err=>{
        req.flash("error", err.message)
        res.redirect("/auth/signup")
    })
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login', passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/explore/index",
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