const mongoose = require("mongoose");

const connectDB = async (uri) => {
    return await mongoose.connect(uri).catch(function (error) {
            console.log(`Unable to connect to the Mongo db  ${error} `);
        });
}

module.exports = { connectDB }
