Meteor.publish('categories',function(){
    return categories.find();
});
Meteor.publish('article',function(){
    return article.find();
});
Meteor.publish('images', function (){ 
  	return images.find({});
});
Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});
Meteor.publish("users", function () {
    return Meteor.users.find({});
});
Meteor.publish('articleadmin',function(skip){
	var arrId=[];
	var arrayId=[];
     var result=article.find();
     result.forEach(function(value){
     	arrId.push(value._id);
     });
     for(var i=skip;i<10+skip;i++){
     	arrayId.push(arrId[i]);
     }
     return article.find({_id:{$in:arrayId}});
});