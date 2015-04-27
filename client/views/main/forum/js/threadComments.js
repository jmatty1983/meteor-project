Template.ThreadComments.allComments = function(){
	allComments = Comments.find({threadID: Session.get('threadID')});
	if(allComments)
		return allComments;
	else
		return null;
}