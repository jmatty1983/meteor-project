Template.PageController.currentScreen = function(){
	return Template[Meteor.Transitioner.currentPage()]();
}

Template.NextScreen.nextScreen = function(){
	if(Meteor.Transitioner.nextPage())
		return Template[Meteor.Transitioner.nextPage()]();
}

