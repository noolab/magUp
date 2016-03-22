Template.articledetail.helpers({
	getImage:function(){
		var id = this.imageId;
		var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
    getvideo:function(){
        var id = this.videoId;
        var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
/*	relatearticle:function(){
		var id = this.catId;
        var items = article.find({catId:id}, {sort: {createdAt: -1}}).fetch();
        return items.slice(1,5);
	},*/
    relatearticle: function(){
    function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var id = this.catId;
        var myArray=[];
        var itemsRandom=[];
        var items = article.find({catId:id}, {sort: {createdAt: -1}}).fetch();
        items.forEach(function(value){
            myArray.push(value);
        });
        var arrayRandom=shuffle(myArray);
        for(var ran=0;ran<4;ran++){
            if(arrayRandom[ran]){
               itemsRandom.push(arrayRandom[ran]); 
            }  
        }
        return itemsRandom;
    },
	getImagerelate:function(image){
		var img = images.findOne({_id:image});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
    /*relateArtByDate:function(){
        var id = this.catId;
        var items = article.find({catId:id}, {sort: {createdAt: -1}}).fetch();
        return items.slice(0,1);
    },*/
    relateArtByDate: function(){
    function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var id = this.catId;
        var myArray=[];
        var itemsRandom=[];
        var items = article.find({catId:id}, {sort: {createdAt: -1}}).fetch();
        items.forEach(function(value){
            myArray.push(value);
        });
        var arrayRandom=shuffle(myArray);
        for(var ran=0;ran<1;ran++){
            if(arrayRandom[ran]){
               itemsRandom.push(arrayRandom[ran]); 
            }  
        }
        return itemsRandom;
    },
    sortArt:function(){
        var id = this.catId;
        var temp = Session.get('param');
        d = article.find({catId:id});
        var arr = [];
        d.forEach(function(item){
            var date = new Date(item.createdAt);
            var diffDaysCur = Math.round(Math.abs((date.getTime())));
            var obj = {
                "_id":item._id,
                "createdAt":diffDaysCur
            }
            arr.push(obj);
        });
        arr.sort(function(a, b){
            var keyA = a.date;
            var keyB = b.date;
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        });
        return arr;
    }
});