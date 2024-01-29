const mongoose = require('mongoose')

const connection = async()=>{
    try{
    const result = await mongoose.connect(process.env.DATABASE)
    if(result)console.log("database connected successfully")

    }catch(e){
        console.error('Error connecting to the database:', e);
        process.exit(1);
    }
}


mongoose.connection.on('disconnected', () => {
    console.log('Database connection disconnected');
  });
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('Database connection closed due to app termination');
      process.exit(0);
    } catch (error) {
      console.error('Error closing database connection:', error);
      process.exit(1);
    }
  });
  

module.exports = {connection}