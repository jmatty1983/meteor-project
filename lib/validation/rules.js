validators = {
	// User validations 
	username: {
		min: 4,
		max: 20,
		alphaNum: true,
		required: true
	},
	password: {
		min: 8,
		max: 30,
		reqiured: true
	},
	email: {
		required: true,
		email: true
	},

	//forum validations
	thread_title: {
		required: true,
		min: 10,
		max: 50,
		alias: 'Thread title'
	},
	thread_body: {
		required: true,
		alias: 'Thread body'
	},
	post_time: {
		time_elapsed: _config.post_time,
		alias: 'Post Time'
	}
}