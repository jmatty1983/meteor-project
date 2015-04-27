Accounts.config({sendVerificationEmail: true});

Accounts.validateNewUser(function(user){
	if(validate(user.username, 'username'))
		return true;
});

Accounts.validateNewUser(function(user){
	if(validate(user.emails[0].address, 'email'))
		return true;
});

Accounts.onCreateUser(function(options, user) {
	if (options.profile)
		user.profile = options.profile;
	
	user.profile.lastPost = 0;
	
	return user;
});

Meteor.publish("all-topics", function(){
	return Topics.find({});
});

Meteor.publish("topic-threads", function(topic){
	if (topic)
		return Threads.find({topic: topic});
	else
		return null;
});

Meteor.publish("thread-comments", function(threadID){
	if(threadID)
		return Comments.find({threadID: threadID});
	else
		return null;
});

Threads.allow({
	insert: function (userId, doc){
		if(userId && doc.topic)
			return(validate(doc.title, 'thread_title') && validate(doc.body, 'thread_body'));
	},
	update: function(userId, doc, fieldNames, modifier){
		if(userId || (fieldNames.length === 1 && fieldNames[0] === 'views'))
			return true;
	}
});

Comments.allow({
	insert: function(userId, doc){
		if(userId && doc.threadID)
			return(validate(doc.body, 'thread_body'));
	}
});

Meteor.users.allow({
	update: function(userId, doc, fieldNames, modifier){
		if(userId === doc._id && fieldNames.length === 1 && fieldNames[0] === 'profile')
			return true;
	}
})