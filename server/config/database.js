import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI =  "mongodb+srv://anishaagrawal05:anisha05@cluster0.7v2znp9.mongodb.net/creators-platform?retryWrites=true&w=majority";

    console.log("Connecting to:", mongoURI);


    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;