const mongoose = require('mongoose');
const schema = mongoose.Schema;

const COURSE = new mongoose.Schema({
    courseInstructor:
    {
        type: String,
        required: true
    },
    courseCredits:
    {
        type: Number,
        required: true
    },
    courseID:
    {
        type: String,
        required: true
    },
    courseName:
    {
        type: String,
        required: true
    },
    dateEntered:
    {
        type: Date,
        required: true,
        default: Date.now
    },
});
mongoose.model("COURSE", COURSE);