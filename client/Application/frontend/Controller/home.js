Template.home.onRendered(function() {
    $(window).resize(function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        if((windowWidth<=320) && (windowHeight<=480)){
            Router.go("/search");
        }else if((windowWidth>320) && (windowWidth<=768)){
            Router.go("/login");
        }else{
            Router.go("/");
        }
    });
});
Session.set('limit',4);
Template.home.helpers({
	showFirstRow:function(){
        var items = article.find({},{limit:4});
        return items;
    },
	morearticle:function(){
		var items = article.find({}, {sort: {name: 1},limit:Session.get('limit')}).fetch();
        if(items.length>0)
  		    return items.slice(4,items.length);
        else
            return null;
	},
	firstarticle:function(){
		return items = article.findOne({}, {sort: {createdAt: -1},limit:1});
	},
	secondarticle:function(){
		var items = article.findOne({},{skip: 1, limit: 1});
		return items;
	},
	getImage:function(id){
		var img = images.findOne({_id:id});
        if(img){
            return img.copies.images.key;
        }else{
            return;
        }
	}
});
Template.home.onCreated(function() {
    var self = this;
    self.zoom = new ReactiveVar(0);
    $(window).on('scroll', function(e) {
       if($(window).scrollTop() == $(document).height() - $(window).height()) {
       		Session.set("firstrecord",2);
            console.log('DISPLAYMORE');
            var oldLimit=Session.get('limit');
            oldLimit+=4;
            Session.set('limit',oldLimit);
            console.log('limit='+Session.get('limit'));
           //alert("Welcome Rosoty");
    	}
    });
});