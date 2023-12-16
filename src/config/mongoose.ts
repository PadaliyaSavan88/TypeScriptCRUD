import mongoose from "mongoose"

const MONGO_URL = 'mongodb://127.0.0.1:27017/TypeScript'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))