Template.AddThreadComment.events({
	'click #btnPost': function(){
		var comment_body = $('#comment_body').val();
		var username = Meteor.user().username;

		try{
			validate(comment_body, 'thread_body');
			validate(Meteor.user().profile.lastPost, 'post_time');
			var threadID = Session.get('threadID');

			Comments.insert({
				threadID: threadID,
				body: comment_body,
				username: username,
				createdAt: Date.now(),
				updatedAt: Date.now()
			});

			Threads.update(
				{_id: threadID},
				{$inc: {replies: 1}}
			);

			Meteor.users.update(
				{_id: Meteor.userId()},
				{$set: {
					profile: {
						lastPost: Date.now()
					}
				}
			});

			$('#comment_body').val('');
			Session.set('curErr', null);
		}catch(err){
			Session.set('curErr', err.reason);
		}
	}
});