const mongoose = require('mongoose');
const Hospital=require("./hospital");
const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital"
  },
  contactNumber: {
    type: String,
    default: ''
  }
},);
const Department=mongoose.model("Department",DepartmentSchema);
module.exports=Department;