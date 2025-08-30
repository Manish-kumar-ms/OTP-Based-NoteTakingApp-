import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();
const mongo_url=process.env.MONGODB_URL

const connectDB=async()=>{

        mongoose.connect(mongo_url)
        .then(()=>{
            console.log('MongoDB connected')
        })
     .catch((error) => {
        console.log(error)
     })

}

export default connectDB;