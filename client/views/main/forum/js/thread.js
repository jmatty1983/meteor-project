Template.thread.thisThread = function(){

	threadID = Session.get('threadID');
	return Threads.findOne({_id: threadID});
}

Template.thread.forumLink = function(){
	return Meteor.Router.forumUrl();
}