Template.SignUpForm.events({
	'click #btnSignUp': function(e,t){
		signUpUser();
	},
	'keyup #usernameSU': function(e, t){
		if (e.keyCode === 13)
			signUpUser();
	},
	'keyup #passwordSU': function(e, t){
		if (e.keyCode === 13)
			signUpUser();
	},
	'keyup #passconf': function(e, t){
		if (e.keyCode === 13)
			signUpUser();
	},
	'keyup #email': function(e, t){
		if (e.keyCode === 13)
			signUpUser();
	}
});

function signUpUser(){
	var password = $('#passwordSU').val();
	var passconf = $('#passconf').val();

	if (password !== passconf){
		Session.set('curErr', 'Password fields do not match');

	} else {
		var options = {
			username: $('#usernameSU').val(),
			password: $('#passwordSU').val(),
			email: $('#email').val(),
			profile: {}
		}

		

		try{
			validate(options.username, 'username');
			validate(options.password, 'password');
			validate(options.email, 'email');

			Accounts.createUser(options, function(err){
				if(err){
					Session.set('curErr', err.reason);
				}
				else
					$('#signUpForm').modal('hide');
			});
		}catch(err){
			Session.set('curErr', err.reason);
		}
	}
}