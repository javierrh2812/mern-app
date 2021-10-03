import mongoose from 'mongoose'
const connect = () => {
  const {DATABASE} = process.env
  mongoose
    .connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Successfully connected to database')
    })
    .catch(error => {
      console.log('database connection failed. exiting now...')
      console.error(error)
    })
}

export default {connect}
