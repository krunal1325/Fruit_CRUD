const mongoose = require("mongoose");

const ConnectDB = (url)=>{
    mongoose.connect(url).then((data,err)=>{
        if (err) {
            console.log("Error",err);
        }
        console.log("Database connected!");
    })
}

module.exports  = { ConnectDB };

