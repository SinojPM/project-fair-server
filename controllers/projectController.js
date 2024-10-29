const projects = require('../models/projectModel')

//add projects

exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
    const {title,languages,overview,github,website}= req.body
    console.log(title,languages,overview,github,website);
    console.log(req.userId);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exists")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImg:req.file.filename,userId:req.userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
    
    
}

exports.getHomeProjectsController = async (req,res)=>{
    console.log("inside getHomeProjectsController");
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.getAllProjectsController = async (req,res)=>{
    console.log("inside getAllProjectsController");
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.getUserProjectController = async (req,res)=>{
    console.log("inside getUserProjectController");
    const userId = req.userId
    try{
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    }catch(err){
    res.status(401).json(err)
    }
    
}

exports.removeProjectController = async (req,res)=>{
    console.log("inside project Controller");
    const {pid} = req.params 
}

exports.editProjectController = async (req,res)=>{
    console.log("inside editProjectController");
    const {pid} = req.params
    const {title,languages,overview,github,website,projectImg} = req.body
    
    const uploadImg = req.file?req.file.filename:projectImg
    const userId = req.userId
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectImg:uploadImg,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)

    }catch{
        res.status(401).json(updateProject)
    }
    
}