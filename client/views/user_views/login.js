Template.LoginForm.events({
	'click #btnLogin': function(e,t){
		logUserIn();
	},
	'keyup #username': function(e, t){
		if(e.keyCode === 13){
			logUserIn();
		};
	},
	'keyup #password': function(e, t){
		if(e.keyCode === 13){
			logUserIn();
		}
	}
});

function logUserIn(){
	var username = $('#username').val();
	var password = $('#password').val();

	try{
		validate(username, 'username');
		validate(password, 'password');

		Meteor.loginWithPassword(username, password, function(err){
			if(err){
				Session.set('curErr', err.reason);
			}
			else{
				$('#loginForm').modal('hide');
				Session.set('curErr', null);
			}
		});

	}catch(err){
		Session.set('curErr', err.reason);
	}
}