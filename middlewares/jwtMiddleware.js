const jwt = require('jsonwebtoken')

//middleware
const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware");
    
    //get token
    console.log(req)
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);

    // step to varify tocken
    
    if(token!=""){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userid
            next()
        }catch{
            res.status(401).json("please login to proceed the step!!!...authentication failed")
        }
    }else{
        res.status(406).json("authentication failed... token missing")
    }
    
}
module.exports = jwtMiddleware