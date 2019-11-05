const express = require('express');
const api = express();
const port = 3000;

const bodyParser = require('body-parser');

const writeToFile = require('./writeToFile')


const fs = require('fs');

const data = fs.readFileSync('users.json');
//const users = JSON.parse(data);
const users = [];


api.listen(port, (err)=> {
    if (err) console.log(err.message)
    console.log(`Api is listening to port: ${port}`)
})

api.use(bodyParser.json())



api.post('/user/register', (req, res, next) => {
    
    const {userName, email, password, firstName, lastName} = req.body;
    users.push({userName, email, password, firstName, lastName}) 
    writeToFile.writeToFile('users.json', users )
    console.log(req.body)
    res.send("this is respone from my api")
    
})
