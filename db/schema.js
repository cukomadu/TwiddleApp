const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

const postsSchema = new Schema({
  title: String, 
  body: String,
  user: Object
})

const tweetSchema = new Schema({
		content: String,
		userHandle: String
	},
	
	{
		timestamps: true
	}
)

module.exports = {
  // User: createModel('User', usersSchema),
  // Post: createModel('Post', postsSchema)
  Tweet: createModel('Tweet', tweetSchema)
}
