Template.header.helpers({
	dismenu:function(){
		return categories.find({},{limit:5});
	}
});