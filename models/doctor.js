const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Department=require("./department");
const Hospital=require("./hospital");
const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    availableDates: [{
        type: Date,
        default:Date.now(),
    }],
});
module.exports = mongoose.model('Doctor', DoctorSchema);
