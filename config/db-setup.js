const mongoose = require('mongoose')

module.exports = {
   connectToDB: function(projectName){
      console.log('running db-setup')
      let dbLocation = 'mongodb://localhost/'+ projectName

      if (process.env.NODE_ENV = "development"){
        dbLocation += "_dev"
        mongoose.connect(dbLocation , (err, db)=>{
          if (err) {
            console.log(err)
          }
          console.log("\n\n===== Connected to: " + dbLocation +  "=====\n\n")
        })
      } else {
        dbLocation += "_production"
        mongoose.connect(dbLocation)
      }  
      console.log('finished setup')
    }
}
