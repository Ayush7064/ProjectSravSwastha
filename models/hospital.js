const mongoose = require('mongoose');
const Department=require("./department");
const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      contactNumber: {
        type: String,
        required: true
      },
      availableBeds: {
        type: Number,
        default: 0
      },
      totalBeds: {
        type: Number,
        required: true
      }
      
});

const Hospital=mongoose.model("Hospital",HospitalSchema);
module.exports=HospitalSchema;
module.exports=Hospital;
