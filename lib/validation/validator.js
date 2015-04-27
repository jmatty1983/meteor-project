validate = function(data, member){
	ruleSet = validators[member];

	if(ruleSet){
		for (var rule in ruleSet){
			if (ruleSet.alias)
				var alias = ruleSet.alias;
			else
				var alias = member;
			switch(rule){					
				case 'min':
					if(!checkMin(data, ruleSet.min)){
						throw new Meteor.Error(403, alias + ' must at least ' + ruleSet.min + ' characters.', data);
						return false;
					}
					break;
				case 'max':
					if(!checkMax(data, ruleSet.max)){
						throw new Meteor.Error(403, alias + ' must be less than ' + ruleSet.max + ' characters.', data);
						return false;
					}
					break;
				case 'alphaNum':
					if(!checkAlphaNum(data)){
						throw new Meteor.Error(403, alias + ' must be alpha numeric.', data);
						return false;
					}
					break;
				case 'required':
					if(!data || data.length === 0){
						throw new Meteor.Error(403, alias + ' required.', data);
						return false;
					}
					break;
				case 'email':
					if(!checkEmail(data)){
						throw new Meteor.Error(403, data + ': invalid email address', data);
						return false;
					}
					break;
				case 'time_elapsed':
					rightNow = Date.now();
					if(!(rightNow - data > ruleSet.time_elapsed)){
						timeLeft = Math.round((ruleSet.time_elapsed - (rightNow - data)) / 1000);
						throw new Meteor.Error(403, 'You must wait ' + timeLeft + ' seconds');
						return false
					}
				default:
					break;
			}
		}
	}
	return true;
}

function checkMin(data, min){
	return data.length >= min;
}

function checkMax(data, max){
	return data.length < max;
}

function checkAlphaNum(data){
	reg = /^[a-z0-9]+$/i;
	return reg.test(data);
}

function checkEmail(data){
	reg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
	return reg.test(data);
}