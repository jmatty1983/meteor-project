Template.Navigation.helpers({
	forumLink: function(e, t){
		return Meteor.Router.forumUrl();
	},
	newsLink: function(e, t){
		return Meteor.Router.newsUrl();
	}
});