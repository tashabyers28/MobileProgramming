//dependencies
const { application, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

//MongoDB
const mongoose = require('mongoose');
const PORT = 1200;
const dbURL = "mongodb+srv://admin:Password1@cluster0.prxr7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//Connect to DB
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//This is the MongoDB Connection
const db = mongoose.connection;
//Handle error/Display connection
db.on('error', () => {
    console.error.bind(console, 'Oops! Connection Error: ');
});
db.once('open', () => {
    console.log(`API for Individual Assignment 7 - MongoDB Connected on ${PORT}!`);
});

//Set up Models
require('./Models/Course');
require('./Models/Student');
const Course = mongoose.model("COURSE");
const Student = mongoose.model("STUDENT");

//the below route can be used to make sure that postman is working. 
//To use: uncomment the section, and send a get request on localhost:1200/ and you will get the json body returned.
// app.get('/', (req, res) => {
//     return res.status(200).json("{message:'ok'}")
// });


//Below are the routes. Please pick one to work on and document.

//getAllCourses Route written by Tasha Denson-Byers
//After connecting to the server/API, to 'GET' all
//courses listed in the database, the await keyword works
//inside the async function to execute the action of finding
//all the records in courses using the empty 'find' function.
//The 'lean' function makes the process fast and easier on memory.
//Once the code executes, a response code of 200 is returned along
//with a listing of all of the 'courses' housed in the database.
app.get('/getAllCourses', async (req, res) => {
    try {
        let courses = await Course.find({}).lean();
        return res.status(200).json(courses);
    }
    catch {
        return res.status(500).json("Error - courses not found");
    }
});

//ROUTENAME written by Abdishakur Abdi
/*
    this route gets all the stuednts information and then
    displays it as JSON format.
*/
app.get('/getAllStudents', async (req, res) => {
    try {
        let students = await Student.find({})
        return res.status(200).json(students)

    }
    catch {
        return res.status(500).json("Error - students not found");
    }
});

//ROUTENAME written by Jax Pelzer
/*
    This is a get route that will find a student with first name 
    that is given and the display all other data on that student

{
    "fname": "NAME HERE"
}

*/
app.get('/findStudent', async (req, res) => {
    try {
        let student = await Student.find({ fname: req.body.fname })

        return res.status(200).json(student)
    }
    catch {
        return res.status(500).json("Error - student not found");
    }
});

//findCourse written by Kevin
/*
    This route waits for user to insert a courseID in JSON format
     into the body like so:
    {
        "courseID": "COURSE ID HERE"
    }
     will return information about queried course.
*/
app.get('/findCourse', async (req, res) => {
    try {
        let course = await Course.find({ courseID: req.body.courseID })

        return res.status(200).json(course);
    }
    catch {
        return res.status(500).json("Error - course not found");
    }
});

//addCourse written by Martin Schendel
//To add a course: 
//  send a POST request on localhost:1200/addCourse
//  body must be JSON that provides:
/*
  {
    "courseInstructor": "",
    "courseCredits": #,
    "courseID": "",
    "courseName": ""
  } 
*/

app.post('/addCourse', async (req, res) => {
    try {
        let course = {
            courseInstructor: req.body.courseInstructor,
            courseCredits: req.body.courseCredits,
            courseID: req.body.courseID,
            courseName: req.body.courseName
        }
        await Course(course).save().then(() => {
            return res.status(201).json("Course added");
        });
    }
    catch {
        return res.status(500).json("Course not added");
    }
});

//ROUTENAME written by Coy Bailey
//This route allows the client to add a student to the database using the POST request
/*
  {
    "fname": "",
    "lname": "",
    "studentID": #
  } 
*/
app.post('/addStudent', async (req, res) => {
    try {
        let student = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID
        }
        await Student(student).save().then(() => {
            return res.status(201).json("Student added");
        });
    }
    catch {
        return res.status(500).json("Student not added");
    }
});

//ROUTENAME /editStudentById written by Tasha B.
//Inserting the following student id, the given fname will update
//in the database using the POST request
/*
  {
    "studentID": #
    "fname": "",
  } 
*/
app.post('/editStudentById', async (req, res) => {
    try {//Works!
        let student = await Student.findOneAndUpdate({ studentID: req.body.studentID },
            {
                $set: { fname: req.body.fname }
            },
            {returnOriginal: false} )

        await Student(student).save().then(() => {
            return res.status(201).json("Student's first name updated.");
        });
    }
    catch {
        return res.status(500).json("Failed to access student");
    }
});

//ROUTENAME /editStudentByFname written by Tasha B.
//Inserting the following queryName, the given fname and lname will update
//in the database using the POST request
/*
  {
    "queryName": "",
    "fname": "",
    "lname": ""
  } 
*/
app.post('/editStudentByFname', async (req, res) => {
    try { //Works!
     let student = await Student.updateOne({ fname: req.body.queryFname },
        { $set:
            { fname: req.body.fname, lname: req.body.lname }
        }, 
        {upsert: true}
        );
        if(student)
            {
                res.status(200).json("Student edited");
            }
        else
        {
            return res.status(200).json("Oops, student not edited");
        }        
    }
    catch {
        return res.status(500).json("Failed to access student");
        }
});

//ROUTENAME /editCourseByCourseName written by Tasha B.
//Inserting the following courseName and a new instructor name will update
//the old instructor name to the new posted instructor name
//in the database using the POST request
/*
  {
    "courseName": "",
    "instructorName": ""
  } 
*/
app.post('/editCourseByCourseName', async (req, res) => {
    try { //Works!
        let course = await Course.updateOne({ courseName: req.body.courseName },
            { $set: 
                { courseInstructor: req.body.instructorName }
            },
            {upsert: true}
            );
        if(course)
            {
                res.status(200).json("Course instructor name edited");
            }
        else
        {
            return res.status(200).json("Oops, course instructor name not edited");
        }        
    }
    catch {
        return res.status(500).json("Failed to access course");
    }
});

//ROUTENAME /deleteCourseById written by Tasha B.
//Inserting the following courseId will delete the
//course in the database using the POST request
/*
  {
    "id": #
  } 
*/
app.post('/deleteCourseById', async (req, res) => {
    try {//Works!
        let course = await Course.deleteOne({ courseID: req.body.id });

        if(course){
            return res.status(200).json("Course has been deleted");
        }
        else{
            return res.status(200).json("Oops, course not deleted");
        }
    }
    catch {
        return res.status(500).json("Failed to access course");
    }
});

//ROUTENAME /removeStudentFromClasses written by Tasha B.
//Inserting the following studentId will delete the
//student in the database using the POST request
/*
  {
    "studentId": #
  } 
*/
app.post('/removeStudentFromClasses', async (req, res) => {
    try {//Works!
        let student = await Student.deleteOne({ "studentID": req.body.studentId });
            
        if(student){
            res.status(200).json("Student has been removed");
        }
        else{
            return res.status(200).json("Oops, student not removed");
        }
    }
    catch {
        return res.status(500).json("Failed to access student");
    }
});

//Start the Server
app.listen(PORT, () => {
    console.log('For Individual Assignment Using Group1A4 Base...')
});
