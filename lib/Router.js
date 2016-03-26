Router.configure({
    layoutTemplate: 'MainLayout'
});
Router.route('/', {
    name: 'home',
    waitOn:function(){
        return[Meteor.subscribe('article'),Meteor.subscribe('images')];
    }
});
Router.route('/listarticle/:_id', {
    name: 'beauty',
    data:function(){
        return categories.findOne({_id:this.params._id});
    },
    waitOn:function(){
        return[Meteor.subscribe('article')];
    }
});
// =========== Article =================
Router.route('/article', {
    name: 'article'
});
Router.route('/articledetail/:_id', {
    name: 'articledetail',
    data:function(){
        return article.findOne({_id: this.params._id});
    },
    waitOn:function(){
        return[Meteor.subscribe('article')];
    }
});
Router.route('/displayarticle', {
    name: 'displayart',
    waitOn:function(){
        var skip=Session.get('skip');
        return[Meteor.subscribe('articleadmin',skip)];
    }
});
Router.route('/updateArticle/:_id', {
    name: 'updateArt',
    data:function(){
    	return article.findOne({_id: this.params._id});
    }
});
// ============== Categories ================
Router.route('/categories', {
    name: 'categories'
});
Router.route('/managecategories', {
    name: 'discategories'
});
Router.route('/updatecate/:_id',{
    name:'updatecate',
    data:function(){
        return categories.findOne({_id: this.params._id});
    }
});
// ================== user =====================
Router.route('/login', {
    name: 'login'
});
Router.route('/register', {
    name: 'register'
});
//=========== Search ============= //
Router.route('/search', {
    name: 'searchBox'
});
// =========== Mange User ============== //
Router.route('/manageuser', {
    name: 'manageuser'
});
Router.route('/edituser/:_id', {
    name: 'edituser',
    data: function(){
        return Meteor.users.findOne({_id: this.params._id});
    }
});
