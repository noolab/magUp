 Meteor.methods({
   registerUser:function(username,email,password){
    var myroles = "member";
    targetUserId=Accounts.createUser({
    	profile:{username:username},
        email: email,
        password: password
       });
    //console.log(targetUserId);
    Roles.setUserRoles(targetUserId,myroles);
   }
});
 Meteor.methods({
    addUser:function(username,email,password,mySelect){
        targetUserId=Accounts.createUser({
            email: email,
            password: password,
            profile:{username:username}
       });
    Roles.setUserRoles(targetUserId, [mySelect])
   },
   deleteUser: function (id) {
      return Meteor.users.remove(id);
   }
});
// update user
Meteor.methods({
    updateroles:function(id,mySelect){
        var attr=[mySelect];
        return Meteor.users.update({_id:id},{$set:{roles:attr}});
    },
    edituser: function(id,username,email) {
        var attr={
            emails:[{address: email,verified: "false"}],
            profile:{username:username}
        }
        return Meteor.users.update({_id:id},{$set: attr});
        //return Meteor.users.update(id,{$set: {profile:attr}});
    }
});