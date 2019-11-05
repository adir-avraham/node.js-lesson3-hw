const fs = require('fs') 

function writeToFile (file, data) {
    const users = JSON.stringify(data, null, 2);
    fs.writeFile(file, users, (err)=>{
        if (err) console.log(err.message)
    })

}


module.exports.writeToFile = writeToFile