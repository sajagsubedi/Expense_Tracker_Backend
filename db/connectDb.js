import mongoose from "mongoose"

mongoose.set("strictQuery", false);
// connectng to database
const connectToDB = (mongoURI) => {
  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDB

