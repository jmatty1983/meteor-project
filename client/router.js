Meteor.Router.add({
	'/': 'news',
	'/forum': 'forum',
	'/news': 'news',

	'/forum/:topic/newThread': {as: 'newThread', to: function(topic){
		Session.set('forumTopic', topic);
		return 'NewThread';
	}},
	'/forum/:topic': {as: 'topic', to: function(topic){
		Session.set('forumTopic', topic);
		return 'topic';
	}},
	'/forum/:topic/:id': {as: 'thread', to: function(topic, id){
		Session.set('forumTopic', topic);
		Session.set('threadID', id);
		Threads.update(
			{_id: id},
			{$inc: {views: 1}}
		);
		return 'thread';
	}}
});

Meteor.Router.filters({
	'checkLoggedIn': function(page){	
		if (Meteor.user() === 'undefined' || !Meteor.user()){
			Session.set('curErr', 'Please sign in!');
			$('#loginForm').modal('show');
		}else{
			return page;
		}
	}	
});

Meteor.Router.filter('checkLoggedIn', {only: 'NewThread'});

Meteor.Router.beforeRouting = function() {
	Session.set('curErr', null);
}