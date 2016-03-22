Router.configure({
    layoutTemplate: 'MainLayout'
});
Router.route('/', {
    name: 'home'
});
Router.route('/beauty', {
    name: 'beauty'
});
// =========== Article =================
Router.route('/article', {
    name: 'article'
});
Router.route('/articledetail/:_id', {
    name: 'articledetail',
    data:function(){
        return article.findOne({_id: this.params._id});
    }
});
Router.route('/displayarticle', {
    name: 'displayart'
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
