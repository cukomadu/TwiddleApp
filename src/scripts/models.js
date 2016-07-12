import Backbone from 'backbone'

// We are using backbone model here to simplify the process of getting and posting 
// to the server

export const TweetModel = Backbone.Model.extend({
	url: "/api/tweets"
})

export const TweetCollection = Backbone.Collection.extend({
	model: TweetModel,
	url: "/api/tweets"
})

