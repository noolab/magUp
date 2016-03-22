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