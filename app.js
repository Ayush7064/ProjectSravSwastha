const express =require("express");
const app = express();
const cors=require("cors");
const mongoose = require("mongoose");
const Patient = require("./models/patient.js");
const Hospital = require("./models/hospital.js");
const Department=require("./models/department.js");
const Doctor=require("./models/doctor.js");
const Appointment=require("./models/appointment.js");
const path = require("path");
const methodOverride = require("method-override");
app.use(cors());
// Add this line to parse JSON request bodies
app.use(express.json());



const MONGO_URL = "mongodb+srv://ayushkasera7064:Mr4CtXBS28OHuMl3@cluster0.xtvw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    res.redirect("/home");
});
app.get("/home", async(req,res)=>{
    res.render("Patient/indexpage.ejs" );
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

app.get("/appointmentnew",(req,res)=>{
    res.render("Patient/form.ejs");
});
app.get("/loginpage",(req,res)=>{
    res.render("Patient/login.ejs");
})

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
     res.render("Patient/paymentSuccessful.ejs",{appointment,depart,Hosp,Doc});
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

});

app.get("/paymentSuccessful",(req,res)=>{
    res.render("Patient/paymentSuccessful.ejs");
});
app.get("/bedavailability",(req,res)=>{
    res.render("Patient/bedavailability.ejs")
});
app.get("/appointmentstatus",(req,res)=>{
    res.render("Patient/appointmentstatus.ejs")
});
app.get("/checkstatus",(req,res)=>{
    res.render("Patient/checkstatus.ejs");
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
//delete Appointment


// hospital end
app.get("/hospital",async(req,res)=>{
    const allApointment= await Appointment.find({}).populate("hospital").populate("doctor").populate("department");
    //console.log(allApointment);

    res.render("hospital/hospitalEnd.ejs",{ allApointment });
})
app.post("/hospital",async(req,res)=>{
    const { department,hospital, doctor, date,name,email,number,age,gender } = req.body;
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
        patientname:name,
        emailId:email,
        mobile :number,
        age:age,
        Gender:gender,
        date:date,
      });
     await appointment.save();
     console.log(appointment);
     console.log("Successfull!!");
      // Send response to client to redirect
    res.json({ redirectUrl: "/hospital" });
});



app.delete("/hospital/:id",async(req,res)=>{
    let id = req.params.id;
    console.log(id);
    let appointment=await Appointment.findByIdAndDelete(id);
    console.log(appointment);
    res.redirect("/hospital");
});








app.listen(8080 , ()=>{
    console.log("Server is listening to port 8080");
})