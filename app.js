const express =require("express");
const app = express();
const mongoose = require("mongoose");
const Patient = require("./models/patient.js");
const Hospital = require("./models/hospital.js");
const Department=require("./models/department.js");
const Doctor=require("./models/doctor.js");
const Appointment=require("./models/appointment.js");
const path = require("path");
const methodOverride = require("method-override");



const MONGO_URL = "mongodb://127.0.0.1:27017/backend";

main()
  .then(()=>{
    console.log("Connected to DB");
})
  .catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/" , (req,res)=>{
    res.send("Hii this is root");
});
app.get("/home", async(req,res)=>{
    
    res.render("Patient/home.ejs" );

});
// index rout

app.get("/homepage", async(req,res)=>{
      const allPatients = await Patient.find({});
      res.render("Patient/index.ejs" , {allPatients});

}); 

// Adding new Patient
app.get("/homepage/new" , (req,res)=>{
    res.render("Patient/form.ejs");
}) 

// Show Rout 
app.get("/homepage/:id", async(req,res)=>{
    let {id} = req.params;
    const patient = await Patient.findById(id);
    res.render("Patient/show.ejs",{patient});
})

//Paydone
app.get("/pay" , (req,res)=>{
    res.render("Patient/PayDone.ejs");
});
 

//Addint new appointment to data base

// Edit Rout :
app.get("/homepage/:id/edit" , async(req,res)=>{
    let {id} = req.params;
    const patient = await Patient.findById(id);
    res.render("Patient/edit.ejs" , {patient})
})

// Update patient :
app.put("/homepage/:id" , async (req,res)=>{
    let { id }= req.params;
    await Patient.findByIdAndUpdate(id, {...req.body.patient});
    res.redirect(`/homepage/${id}`);
})


// Delete Patient:
app.delete("/homepage/:id" , async(req,res)=>{
    let { id }= req.params;
    let DeletePatient = await Patient.findByIdAndDelete(id);
    console.log(DeletePatient);
    res.redirect("/homepage");
});


app.post('/homepage', async (req, res) => {
    const { patientname, emailId, mobile, age, Gender, date, department, hospital, doctor } = req.body;
    console.log(req.body);

    console.log(req.body.hospital);
      // Find department, hospital, and doctor dynamically using the request data
      const depart = await Department.findOne({name:req.body.department});
      const Hosp = await Hospital.findOne({ name: req.body.hospital });
      const Doc = await Doctor.findOne({ name: doctor });
      // Create a new appointment
      
      const appointment = new Appointment({
        department: depart._id,
        hospital: Hosp._id,
        doctor: Doc._id,
        patientname,
        emailId,
        mobile,
        age,
        Gender,
        date,
      });
     await appointment.save();
     console.log(appointment);
     console.log("Successfull!!");
     res.render("Patient/appointment.ejs",{appointment,depart,Hosp,Doc});
  });
  
app.get("/yourappointment",async(req,res)=>{
    try {
        const appointment = await Appointment.find({ user: req.user.id })
            .populate('doctor', 'name')
            .populate('hospital', 'name')
            .populate('department', 'name');
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server error');
    }

})

app.get('/',async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id })
            .populate('doctor', 'name')
            .populate('hospital', 'name')
            .populate('department', 'name');

        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
















app.listen(8080 , ()=>{
    console.log("Server is listening to port 8080");
})