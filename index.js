require('dotenv').config()
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const session = require("express-session")
const passport = require("./config/ppConfig.js")
const flash = require("connect-flash")
const cors = require("cors")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

// body parser middleware to make req.body work
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// set up ejs and ejs layouts
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))
app.use(methodOverride("_method"))

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUnitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middeware - has to be after the session + passport middleware
app.use(flash())

// custom middleware so the messages are always available in our ejs and we don't have to pass through req.alerts to our ejs mannually
app.use((req, res, next)=>{
    //before every route, attach the flash message and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// middleware for images (multer) - stretch goal
// source: https://medium.com/@SigniorGratiano/image-uploads-with-multer-f306469ef2

app.use(cors())
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: true })); //Parse URL-encoded bodies

// use controllers
app.use("/auth", require("./controllers/auth.js"))
app.use("/plant", require("./controllers/plant.js"))
app.use("/garden", require("./controllers/garden.js"))
app.use("/explore", require("./controllers/explore.js"))

// landing route - 
// short description of mission + call to action to sign up
app.get("/", (req, res) => {
    res.render("landing")
})

app.listen(process.env.PORT || 8000, () => { 
    console.log(`You're listening to the earthly sounds of port ${process.env.PORT}`)
})


