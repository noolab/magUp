Session.set('limit',4);
Template.beauty.helpers({
    showFirstRow:function(){
        var catId = Session.get("categoriesId");
        var items = article.find({catId:catId},{limit:4});
        return items;
    },
    currentarticle:function(){
        var catId = Session.get("categoriesId");
        return categories.findOne({_id:catId});
    },
	morearticle:function(){
		var catId = Session.get("categoriesId");
		var items = article.find({catId:catId}, {sort: {name: 1},limit:Session.get('limit')}).fetch();
        if(items.length>0)
  		    return items.slice(4,items.length);
        else
            return null;
	},
	getImage:function(id){
		var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
	getImagemore:function(image){
		var img = images.findOne({_id:image});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
	firstarticle:function(){
		var cateId = Session.get("categoriesId");
		var items = article.findOne({catId:cateId}, {sort: {createdAt: -1},limit:1});
        return items;
	},
	secondarticle:function(){
		var cateId = Session.get("categoriesId");
		var items = article.find({catId:cateId}, {sort: {createdAt: -1},limit:2}).fetch();
        if(items.length>=1)
  		    return items[1];
        else
            return null;
	}
});
Template.beauty.onCreated(function() {
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