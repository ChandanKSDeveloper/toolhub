import mongoose from "mongoose"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
          console.log(`\n MONGODB connected !! DB host ${connectionInstance.connection.host}`);

    } catch (error) {
          console.error("MONGODB connection FAILED : ",error);
        process.exit(1); 
    }
}

export default connectDB;