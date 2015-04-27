Meteor.subscribe("all-topics");

Deps.autorun(function () {
	Meteor.subscribe("topic-threads", Session.get("forumTopic"));
});

Deps.autorun(function () {
	Meteor.subscribe("thread-comments", Session.get("threadID"));
});