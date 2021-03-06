if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let port = process.env.PORT
  let mongoUrl = process.env.MONGODB_URI
  
  if (process.env.NODE_ENV === 'test') {
    port = process.env.PORT_TEST
    mongoUrl = process.env.MONGODB_URI_TEST
  }
  
  module.exports = {
    mongoUrl,
    port
  }