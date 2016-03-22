Session.set("mgerroratical","");
Session.set("registerError", "" );


Template.article.events({
	'click #btn-save':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var desc = $('#desc').val();
		var img = Session.get('ADDIMAGEID');
		var video = Session.get('ADDVIDEOID');
        var youtube = $("#youtube").val();
        var tube_url=youtube.replace(/#.*|\&index.*/gi, "");
            tube_url = tube_url.replace("watch?v=","embed/");
            tube_url = tube_url.replace("&list=","?list=");
        var tube_url = youtube.replace("watch?v=","embed/");
		var cate = $("#cate").val();
         var msg ="";
        if (title == "" || desc == "" || img  == "undefined" || img == null || video == "undefined" || video == null || tube_url == "" || cate == ""){
            if (title == ""){
                msg+= "Please enter your title"+"<br/>";
                console.log("title");
            }

            if (desc == ""){
                msg+= "Please enter your description"+"<br/>";
                console.log("desc");
            }

            if (img  == "undefined" || img == null){
                msg+= "Please select your image"+"<br/>";
                console.log("img");
            }

            if (video == "undefined" || video == null ){

                msg+= "Please select your video"+"<br/>";
                console.log("video");
            }

            if (cate == "" || cate == "Select Categories"){
                msg+= "Please select your category"+"<br/>";
                console.log("cat");
            }
            Session.set("mgerroratical",msg);
            Session.set("registerError", msg );
        }else {
            Meteor.call('addarticle',title,desc,img,video,tube_url,cate);
            Session.set("mgerroratical","");
            Session.set("registerError","" );
            Router.go('/displayarticle');
        }
	},
	'change #img': function(event, template) {
        var files = event.target.files;
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'change #video': function(event, template) {
        var files = event.target.files;
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('ADDVIDEOID', fileObj._id);
          	});
        }
    },
    "change #cate":function(){
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
    },
    "keyup #title":function(e){
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
    },
    "keyup .descriptatical":function(e){
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
    },
    "keyup .videourl":function(e){
        Session.set("mgerroratical","");
        Session.set("registerError", "" );
    }
});
Template.article.helpers({
	getCate:function(){
		return categories.find();
	},
    getmsg: function(){
        var msg = Session.get('mgerroratical',msg);
        if( msg !="" ) return msg;
        else msg ='';
    },
    registerError:function(){
        var msg = Session.get("registerError");
        if( msg ) return true;
        else return false;
    },
    registerErrormsg: function(){
        geterr=Session.get("registerError");
        
        return geterr;
    }
});
Template.displayart.helpers({
	displayart:function(){
		return article.find();
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
	getCate:function(){
		var catID = this.catId;
		return categories.find({_id:catID});
	}
});
Template.displayart.events({
	'click #remove-art':function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call('removeArt',id);
        }    
    }
});
Template.updateArt.events({
	'click #btn-update':function(e){
		e.preventDefault();
		var id = this._id;
		var title = $('#title').val();
		var desc = $('#desc').val();
		var img = Session.get('ADDIMAGEID');
        var youtube = $("#youtube").val();
        var tube_url=youtube.replace(/#.*|\&index.*/g, "");
            tube_url = tube_url.replace("watch?v=","embed/");
            tube_url = tube_url.replace("&list=","?list=");
		var video = Session.get('ADDVIDEOID');
        var currentvideo = $("#currentvideo").val();
		var cate = $("#cate").val();
        var currentImage = $('#currentImage').val();
        if(typeof img == "undefined"){
            img = currentImage;
            alert("hello2"+img);
        }
        if(typeof video == "undefined"){
            video = currentvideo;
        }
        Meteor.call('editarticle',id,title,desc,img,video,tube_url,cate,function(error,result){
            if(error){}
            else{
                Session.set('ADDIMAGEID',undefined);
                Router.go('displayart');
            }

        });
	},
	'change #img': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'change #video': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            images.insert(files[i], function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                Session.set('ADDVIDEOID', fileObj._id);
            });
        }
    }
});
Template.updateArt.helpers({
	getcatname:function(){
        return categories.find({});
    },
    currentcat:function(){
        var id = this.catId;
        return categories.find({_id:id});
    }
});