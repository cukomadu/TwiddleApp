let Router = require('express').Router;
const apiRouter = Router()

/*
let User = require('../db/schema.js').User
let Post = require('../db/schema.js').Post
*/

let Tweet = require('../db/schema.js').Tweet

//read many tweets
// '/tweets' is a route for our server not backbone router
// .find() is a mongoose method for fetching data from the server just like .fetch() in backbone
// tweet.find sends a query from the client to the server and wraps the response in json
// err is a mongo err that is returned if an invalid route is requested
apiRouter.get('/tweets', function(request, response){
    Tweet.find({}, function(err, results){
      if(err){
        console.log(err)
        response.json({
          message: err
        })
      }
      response.json(results)
    })
})


//.get is part of the tooling method in express. it means we are setting a function 
//that will respond to a get request. It returns a response data from the server
// apiRouter.get('/users', function(req, res){
//   User.find({}, function(err, results){
//     res.json(results)
//   })
// })

//read many
// apiRouter.get('/posts/', function(req, res){
//   Post.find(req.query, function(err, results){
//     res.json(results)
//   })
// })

apiRouter.post('/tweets', function(request, response){
  // create new variable with Tweet constructor created by Moongoose,
  // passing in Tweet data sent by the client
  let newTweet = new Tweet(request.body)
  // Save new Tweet into database, show error callback if save was  unsuccessful
  newTweet.save(function(err){
    if(err){
        console.log(err)
        response.json({
          message: err
        })
      }
      else {
        // Send new Tweet back to client to confirm successful post
        response.json(newTweet)

      }
 
  })
})

//read one
apiRouter.get('/posts/:_id', function(req, res){
  Post.findOne(req.params, function(err, result){
    res.json(result)
  })
})

//create one
apiRouter.post('/posts', function(req, res){
  let newPost = new Post(req.body)
  newPost.save(function(err){
    if(err) return res.json({message: 'error saving'})
      res.json(newPost)
  })
})

//update one
apiRouter.put('/posts/:_id', function(req,res) {
  Post.findOne(req.params, function(err,record) {
    for (var prop in req.body) {
      record[prop] = req.body[prop]
    }
    record.save(function(err){
      if(err) return res.json({message: 'error saving'})
      res.json(record)
    })
  })
})

//delete one
apiRouter.delete('/posts/:_id', (req,res) => {
  Post.remove(req.params,(err) => {
    res.status(204).json({msg: "record successfully deleted",
      _id: req.params._id})
  })
})

module.exports = apiRouter