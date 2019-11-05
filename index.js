const express = require('express');
const api = express();
const port = 3000;

const bodyParser = require('body-parser');

const writeToFile = require('./writeToFile')


const fs = require('fs');

const data = fs.readFileSync('users.json');
const users = JSON.parse(data);



api.listen(port, (err)=> {
    if (err) console.log(err.message)
    console.log(`Api is listening to port: ${port}`)
})

api.use(bodyParser.json())

api.use('/', (req, res, next)=>{

    const {userName, email, password, firstName, lastName} = req.body;
    if (!userName || !email || !password || !firstName || !lastName) return res.send("Somthing is missing")
    const isUserExist = users.find((user)=> {return user.userName === userName})
    if (isUserExist) return res.send("User already exsited")
    next()

})

api.post('/user/register', (req, res, next) => {
    
    const {userName, email, password, firstName, lastName} = req.body;
    users.push({userName, email, password, firstName, lastName}) 
    writeToFile.writeToFile('users.json', users )
    console.log(req.body)
    res.send("this is respone from my api")
    
})
