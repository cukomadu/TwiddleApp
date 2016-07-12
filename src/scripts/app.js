import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {TweetModel, TweetCollection} from './models.js'

import TweetView from './TweetView.js'

const app = function() {

	const TweetRouter = Backbone.Router.extend({
		routes: {
			"home": "_showTweets",
			"*catchAll": "_redirect"
		},

		_showTweets: function(){
			var coll = new TweetCollection()
			coll.fetch()
			ReactDOM.render(<TweetView tweetColl={coll} />,document.querySelector('.container'))
		},

		_redirect: function(){
			location.hash = "home"
		},

		initialize: function(){
			Backbone.history.start()
		}


	})

	
	new TweetRouter()
}

app()