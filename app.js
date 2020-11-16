const express = require("express")
const passport = require("passport")
const hbs = require("hbs")
const path = require("path")
const express_session = require("express-session")
const passportUtil = require("./passportutils/passportutil")
let server = express()

let view_dir = path.join(__dirname,"views")
let partials_dir = path.join(__dirname,"views/partials")

hbs.registerPartials(partials_dir)
server.use(express.static("/view_dir"))
server.set("view engine","hbs")
server.use(express_session({
    secret: "random_secret",
    resave: false,
    saveUninitialized: false
}))
server.use(express_session())
server.use(passport.initialize())
server.use(passport.session())
server.use(express.urlencoded({extended:false}))
passportUtil.passInit(passport)



server.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/login")
})
server.get("/login",(req,res)=>{
    res.render("login",{})

})
server.post("/verify", passport.authenticate("local",{
    successRedirect:"/verified"

}))
server.get("/verified",(req,res) =>{
    res.render("verified",{user:req.user})
})

server.listen(8080, () => {
    console.log("Listening on port  8080")

})

