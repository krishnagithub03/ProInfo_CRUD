const mongoose = require('mongoose')

const connectToMongoDB = async (url)=>{
    mongoose.connect(url).then(()=>{console.log('Connected to MongoDB')}).catch((err)=>{console.log(err)});
}
module.exports = connectToMongoDB;