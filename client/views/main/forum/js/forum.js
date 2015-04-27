Template.forum.allTopics = function () {
	// return the posts matching the query set in the routes.
	return Topics.find();
}

Template.forum.forumLink = function(){
	return Meteor.Router.forumUrl();
}