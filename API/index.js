const { response, request } = require('express');
const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());

const PORT = 1100;

let user = {
    username: "dogecoin",
    password: "password1",
    email: "test@test.com",
    courses: {
    "course1": {"classId": "CMSC2204", "courseName": "mobile", "startDate": "8/29/2021", "endDate": "12/21/2021"},
    "course2": {"classId": "CMSC2204", "courseName": "mobile", "startDate": "8/29/2021", "endDate": "12/21/2021"},
    "course3": {"classId": "CMSC2204", "courseName": "mobile", "startDate": "8/29/2021", "endDate": "12/21/2021"}
    }
}

app.get('/getUser', (request, response) => {
    try {
        return response.status(200).json(user);
    }
    catch {
        return response.status(500);
    }
});

app.post('/addUser', (request, response) =>{
    try {
        //let schoolVar = request.body.object.school1;
        //console.log(request.body);
        return response.status(200).json("Added user " + request.body.username + " successfully");
    }
    catch {

        return response.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});