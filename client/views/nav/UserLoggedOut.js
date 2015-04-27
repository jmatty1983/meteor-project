Template.UserLoggedOut.events({
	'click #loginMod': function(e, t){
		$('#loginForm').on('shown', function () {
			$('#username').focus();
		});
		Session.set("curErr", null);
	},
	'click #signupMod': function(e,t){
		$('#signUpForm').on('shown', function () {
    		$('#usernameSU').focus();
		});
		Session.set("curErr", null);
	}
});