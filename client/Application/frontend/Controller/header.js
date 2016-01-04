Template.header.events({
	'click #listCate':function(e){
		e.preventDefault();
		var id = this._id;
		Session.set("categoriesId",id);
		Router.go("beauty");
		//alert(id);
	}
});
Template.header.rendered = function(){
	new UISearch( document.getElementById( 'sb-search' ) );
};