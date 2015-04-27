Template.UserLoggedIn.events({
	'click #logout': function(e,t){
		Meteor.logout();
	}
});