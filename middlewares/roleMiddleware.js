module.exports=(roles)=>{
    return (req,res,next)=>{
        const userRole= req.body.role; // registerden gelen role bu
        if(roles.includes(userRole)){
            next();
        }else{
            return res.status(401).send('You cant do it')
        }
    }
}