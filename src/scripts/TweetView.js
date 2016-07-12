import React from 'react'
import Backbone from 'Backbone'
import {TweetModel, TweetCollection} from './models.js'

// passed collection - tweetColl={coll}

const TweetView = React.createClass({

	getInitialState: function(){
		return {
			tweetColl: this.props.tweetColl
		}
	},

	componentWillMount: function(){

		this.state.tweetColl.on('update sync', () => {
			this.setState({
				tweetColl: this.state.tweetColl
			})
		})

	},


	render: function(){
		console.log('test')
		return (
				<div>
					<Header />
					<Composer tweetColl={this.state.tweetColl}/>
					<TweetContainer coll={this.state.tweetColl} /> 
				</div>
			)
	}
})

const Header = React.createClass({
	render: function(){
		return (
				<div className="header">
					<h1>Twiddle</h1>
				</div>
			)
	}
})

const Composer = React.createClass({

	_submitTwid: function(e){
		e.preventDefault()
		console.log(e)
		var tweetModel = new TweetModel({
			userhandle: e.target.userhandle.value,
			content: e.target.textarea.value
		})
		tweetModel.save() 
		// add the tweet to the collection
		this.props.tweetColl.add(tweetModel)
		e.target.userhandle.value = ''
		e.target.textarea.value = ''


	},

	render: function(){
		return (
				<div className="composer">
					<form onSubmit={this._submitTwid}>
						<input className="u-full-width" name="userhandle" placeholder="Enter your user handle" />
						<textarea className="u-full-width" placeholder="Enter your Twid" name="textarea"></textarea>
						<button className="button-primary" type="submit">Submit</button>
					</form>
				</div>
			)
	}
})

const TweetContainer = React.createClass({
	render: function(){
		console.log(this.props.coll)
		return (
				<div>
					{this.props.coll.map((model) => {
						return <Tweet key={model.cid} model={model}/> 
						})
					}
				</div>
			)
	}
})

const Tweet = React.createClass({
	render: function(){
		console.log(this.props.model)
		return (
				<div>
					<p>{this.props.model.get('userhandle')}</p>
					<p>{this.props.model.get('content')}</p>
				</div>
			)
	}
})

export default TweetView