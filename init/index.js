const mongoose=require("mongoose");
const Hospital=require("../models/hospital");
const Department=require("../models/department");
const Doctor=require("../models/doctor");


main().then(()=>{
    console.log("Connection is established");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
mongoose.connect('mongodb://127.0.0.1:27017/backend');
}

const addHospital=async()=>{
    let data=[{
        name:"Apollo hospital",
        location:"New Delhi",
        contactNumber:"0xx0x0x0x0",
        availableBeds:100,
        totalBeds:100,
    }];
    let addedHosiptal=await Hospital.insertMany(data);
    console.log(addedHosiptal);
    console.log("Successfull!");
}
addHospital();

let departmentData=[
    {
        "name": "Cardiology",
        "description": "Department specializing in heart diseases and treatments.",
        "hospital": "66cf4bbb4f9dc4f10a6b857f",
        "contactNumber": "+1-555-1234"
    },
    {
        "name": "Orthopedics",
        "description": "Department dealing with bone and joint issues.",
        "hospital": "66cf4bbb4f9dc4f10a6b857f", 
        "contactNumber": "+1-555-5678"
    },
    {
        "name": "Neurology",
        "description": "Department focused on the nervous system and brain disorders.",
        "hospital": "66cf4bbb4f9dc4f10a6b857f", 
        "contactNumber": "+1-555-9876"
    },
    {
        "name": "Pediatrics",
        "description": "Department providing medical care for children.",
        "hospital": "66cf4bbb4f9dc4f10a6b857f", 
        "contactNumber": "+1-555-4321"
    }
]

const addDepartment=async()=>{
    let addedDepartment=await Department.insertMany(departmentData);
    console.log(addedDepartment);
    console.log("Successful!!");
}
addDepartment();

let doctorData=[
    {
        "name": "Dr. Ayesha Verma",
        "specialty": "Cardiology",
        "department": "66cf4ec166d0fc0b2ebf984c",
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  
    },
    {
        "name": "Dr. Ravi Sharma",
        "specialty": "Cardiology",
        "department": "66cf4ec166d0fc0b2ebf984c",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Priya Nair",
        "specialty": "Orthopedics",
        "department": "66cf4ec166d0fc0b2ebf984d",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Sanjay Singh",
        "specialty": "Orthopedics",
        "department": "66cf4ec166d0fc0b2ebf984d",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Anjali Patel",
        "specialty": "Neurology",
        "department": "66cf4ec166d0fc0b2ebf984e",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Rajesh Iyer",
        "specialty": "Neurology",
        "department": "66cf4ec166d0fc0b2ebf984e",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Kavita Reddy",
        "specialty": "Pediatrics",
        "department": "66cf4ec166d0fc0b2ebf984f",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    },
    {
        "name": "Dr. Arvind Chatterjee",
        "specialty": "Pediatrics",
        "department": "66cf4ec166d0fc0b2ebf984f",  // Replace with actual Department ObjectId
        "hospital": "66cf4bbb4f9dc4f10a6b857f"  // Replace with actual Hospital ObjectId
    }
]
const addDoctor=async()=>{
    let addedDoctors=await Doctor.insertMany(doctorData);
    console.log(addedDoctors);
    console.log("Sucessfull!!!");
}
addDoctor();

