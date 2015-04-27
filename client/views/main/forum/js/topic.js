Template.topic.allThreads = function(){
	var theRet = new Array();

	Threads.find({}, {sort: {updatedAt: -1}}).forEach(function(thread){
		threadComments = Comments.findOne({threadID: thread._id}, {sort: {updatedAt: -1}});
		
		if(threadComments)
			var lastpost = threadComments.username;
		else
			var lastpost = thread.username;

		theRet.push({
			title: thread.title,
			username: thread.username,
			lastpost: lastpost,
			replies: thread.replies,
			views: thread.views,
			_id: thread._id
		});
	
	});

	return theRet;
}

Template.topic.topicTitle = function(){
	return Session.get('forumTopic');
}

Template.topic.forumLink = function(){
	return Meteor.Router.forumUrl();
}

Template.topic.events({
	'click #btn_newThead': function(e,t){
		Meteor.Router.to('newThread', Session.get('forumTopic'));
	}
});