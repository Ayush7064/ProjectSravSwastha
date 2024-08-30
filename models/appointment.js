const mongoose=require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    patientname: { type: String, required: true },
    emailId: { type: String, required: true },
    mobile: { type: Number, required: true },
    age: { type: Number, required: true },
    Gender: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
    notes: { type: String, trim: true, default: "Your appointment will be booked" },
    createdAt: { type: Date, default: Date.now }
  });
module.exports = mongoose.model('Appointment', AppointmentSchema)