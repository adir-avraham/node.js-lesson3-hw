const fs = require('fs');

function writeToTxt (file, path, ip, date) {

    fs.appendFile(file, `PATH: ${path} IP: ${ip} DATE: ${date}\n`, (err) =>{
        if (err) console.log(err.message);

    }) 
}


module.exports.writeToTxt = writeToTxt;