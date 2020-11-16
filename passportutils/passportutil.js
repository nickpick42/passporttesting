const LocalStrategy = require("passport-local").Strategy
const superheroes = require("superheroes")

let users = [

]

const passInit = (passport) =>{
    let users = generateUser()
    passport.use(new LocalStrategy( (username,password,done)=>{
        console.log("Called")
        let userCheck = userExist(username,password,users )
        if ( !userCheck ){
            // does not exist

            return done(null,false,{message:"No user exist"})
        }else{
            //exist
            return done(null, userCheck )
        }



    }))
    passport.serializeUser( (user,done) =>{
        console.log("Serialized reached")
         done( null, user.id)
    })
    passport.deserializeUser( (userId,done) =>{
        console.log("Deserilizd reached")

        return done( null, userById(userId))
    })

}




const generateUser = ()=>{

    for ( let j = 1; j <  20; j++) {
        let user = superheroes.random()
        let pass = superheroes.random()

        users.push({"id": j, "username": user, "password": pass})
    }
    users.push({"id":20,"username":"nick","password":"nick"})
    console.log(users)

    return users;
}


let userById = ( (id) =>{

    for ( let j = 0; j < users.length; j++){

        if ( users[j].id === id ){
            return users[j]
        }
    }
    return "error"
})
let userExist = (user,password,users) =>{
    for (  let j = 0; j < users.length; j ++){
        if ( users[j].username === user){
            if (users[j].password === password){
                return users[j]
            }else{
                return false
            }
        }
    }
    return false
}

module.exports = {
    passInit: passInit

}