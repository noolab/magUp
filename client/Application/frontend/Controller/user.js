Template.register.events({
    'click #register': function(event){
        event.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        var letters = /^[A-Za-z]+$/;  
        if(username.match(letters)){
            if(email.match(mailformat))
            {
                if(password.match(passw))   
                {
                    Meteor.call('registerUser',username,email,password);
                    Router.go('/login');
                }  
                else  
                { 
                    $("#error_pass").text("[6 to 10 characters,at least 1 specail characters and 1 numeric digits]").css("color","red");  
                    $('[name=password]').focus(); 
                    return false;  
                } 
            }  
            else  
            {  
                $("#error_email").text("invalid email address!").css("color","red");  
                $('[name=email]').focus();  
                return false;  
            }  
            
        }else{
            $("#error_fname").text("plese fill username").css("color","red");
            $('[name=username]').focus(); 
            return false;    
        }
    }
});
Template.login.events({
    'click #login': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                alert('!!! Your Email & Password is not Match');
            }else{
                Router.go('/');
            }
        }); 
    }
});
Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        //alert('logout!!!');
        Meteor.logout();
        Router.go('/login');
    },
    'click #login': function(event){
        event.preventDefault();
        Router.go('/');
    }
});
// ================ Manage User =================== //
Session.set("count",0);
Template.manageuser.events({
    "click #remove":function(e){
        e.preventDefault();
        var id = this._id;
        //alert('Remove Project!!!'+id);
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("deleteUser",id);
        }
    },
    /*'click #adduser': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        //alert(username+email+password+mySelect);
        Meteor.call('addUser',username,email,password,mySelect);
        //Router.go('project');
    }*/
    'submit form': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        //alert(username+email+password+mySelect);
        Meteor.call('addUser',username,email,password,mySelect);
        //Router.go('project');
    }
});
Template.manageuser.helpers({
    getroles:function(){
        return Meteor.roles.find({});
    },
    listuser:function(){
        var a = Session.get("count");
        a++;
        var allUser = Meteor.users.find({});
        return allUser;
    },

});
//==================== Update User =======================
Template.edituser.events({
   'click #edituser': function(e){
        e.preventDefault();
        var id = this._id;
        var username = $('#username').val();
        var email = $('#email').val();
        // var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        Meteor.call('edituser',id,username,email);
        Meteor.call('updateroles',id,mySelect);
        Router.go('/manageuser');
    }
});
Template.edituser.helpers({
     position: function(posit){
      return posit[0];
     },
     displayuser:function(){
        return Meteor.roles.find({});
     }
});