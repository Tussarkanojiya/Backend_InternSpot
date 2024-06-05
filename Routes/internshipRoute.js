const express =require("express")
const router= express.Router();
const internship=require("../Model/Internship");
const internshipd =require("../Data/InternshipDatAvl")


router.post("/",async (req,res)=>{
    try{
      const internships = internshipd;

      const savedInternships = [];

      for(const internshipData of internships){
        const newInternship = new internship(internshipData);
        const savedInternship = await newInternship.save();
        savedInternships.push(savedInternship)
      }

      // Send the saved data as the response
      res.send(savedInternships);
    }catch(error){
      console.error("Error while posting the data:", error);
      res.status(500).send("Internal server Error");
    }
})
router.get("/",async (req,res)=>{
  try {
      const data=await internship.find();
      res.json(data).status(200)
  } catch (error) {
      console.log(error);
      res.status(404).json({error:"Internal server error "})
  }
})
router.get("/:id", async (req,res)=>{
  const {id}=req.params;
  try {
      const data=await internship.findById(id);
      if (!data) {
          res.status(404).json({error:"Internship is not found "})
      }
    return res.status(200).json(data)
  } catch (error) {
      console.log(error);
      res.status(404).json({error:"Internal server error "})
  }
})
module.exports = router