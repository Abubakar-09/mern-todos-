import mongoose from 'mongoose';

connectDB().catch(err => console.log(err));

export default async function connectDB() {
  await mongoose.connect('mongodb+srv://Hello_World:rRXSwOz9i1ZT4J3D@cluster0.m3wscmw.mongodb.net/myProject' || "monofsoa");
  console.log('Connected to DB')  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}