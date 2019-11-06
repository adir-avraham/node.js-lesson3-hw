const express = require('express');
const api = express();
const port = 3000;
const bodyParser = require('body-parser');
const writeToFile = require('./writeToFile')
const writeToTxt = require('./writeToTxt')
const fs = require('fs');
const data = fs.readFileSync('users.json');
const users = JSON.parse(data);
const moment = require('moment');


api.listen(port, (err)=> {
    if (err) console.log(err.message)
    console.log(`Api is listening to port: ${port}`)
})


api.use(bodyParser.json())


api.use('/user/register', (req, res, next)=>{

    const {userName, email, password, firstName, lastName} = req.body;
    if (!userName || !email || !password || !firstName || !lastName) return res.send("Somthing is missing");
    if (!email.includes("@")) return res.send("Email address is not valid");
    const isUserExist = users.find((user)=> {return user.userName === userName});
    if (isUserExist) return res.send("User already exsited");
    next();

})


api.use('/User/login', (req, res, next)=>{
    
    const {userName, password} = req.body;
    const isLogin = users.find((user) =>{ return user.userName === userName && user.password === password});
    if (!isLogin) return res.send("User name or password is incorrect");
    next()
})


api.use('/', (req, res, next)=>{

    const { path , ip } = req  
    const date = moment().format("DD-YY-MM, hh:mm:ss")
    writeToTxt.writeToTxt("log.txt", path, ip, date)

    next()
})


api.post('/User/login', (req, res, next)=>{
    
    res.send("You are logged-in!!!") 
    next()
})


api.post('/user/register', (req, res, next) => {
    
    const {userName, email, password, firstName, lastName} = req.body;
    users.push({userName, email, password, firstName, lastName}) 
    writeToFile.writeToFile('users.json', users )
    console.log(req.body)
    res.send("User registered successfully!")
    
})


api.get('/admin/users', (req, res, next) => {

    return res.download('C:\\Adir\\Jonh Bryce\\Adir avraham\\06 - Node.js\\Lesson3\\Homework\\log-in\\users.json');
})


