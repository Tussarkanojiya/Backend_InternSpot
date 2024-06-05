const express =require("express")
const router= express.Router();
const job=require("../Model/Job");
const jobd =require("../Data/JobsDataAvl")


router.post("/",async (req,res)=>{
  try{
    const jobs = jobd;

    const savedJobs = [];

    for(const jobData of jobs){
      const newJob = new job(jobData);
      const savedJob = await newJob.save();
      savedJobs.push(savedJob)
    }

    // Send the saved data as the response
    res.send(savedJobs);
  }catch(error){
    console.error("Error while posting the data:", error);
    res.status(500).send("Internal server Error");
  }
})
router.get("/",async (req,res)=>{
  try {
      const data=await job.find();
      res.json(data) .status(200)
  } catch (error) {
      console.log(error);
      res.status(404).json({error:"Internal server error "})
  }
})
router.get("/:id", async (req,res)=>{
  const {id}=req.params;
  try {
      const data=await job.findById(id);
      if (!data) {

        res.status(404).json({error:"Job is not found "})
      }
      res.json(data) .status(200)
  } catch (error) {
      console.log(error);
      res.status(404).json({error:"Internal server error "})
  }
})
module.exports = router