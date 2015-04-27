Template.NewThread.events({
	'click #btnPost': function(e,t){
		var thread_title = $('#thread_title').val();
		var thread_body = $('#thread_body').val();

		try{
			validate(thread_title, 'thread_title');
			validate(thread_body, 'thread_body');
			validate(Meteor.user().profile.lastPost, 'post_time');

			threadID = Threads.insert({
				topic: Session.get('forumTopic'), 
				title: thread_title,
				body: thread_body,
				username: Meteor.user().username,
				views: 1,
				replies: 0,
				createdAt: Date.now(),
				updatedAt: Date.now()
			});

			if(threadID){
				Meteor.users.update(
					{_id: Meteor.userId()},
					{$set: {profile: {lastPost: Date.now()}}}
				);
				Meteor.Router.to('thread', Session.get('forumTopic'), threadID);
				Session.set('curErr', null);
			}
		}catch(err){
			Session.set('curErr', err.reason);
		}
	}
})