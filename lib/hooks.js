var IR_BeforeHooks = {
    isAdmin: function(pause) {
        console.log('djib hook');
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin'])) {
            this.render('login');
            pause();
        } else {
            this.next();
        }
    }
    
    
};

var routerNameAdmin = [
    'categories',
    'managecategories',
    'updatecate',
    'manageuser',
    'edituser',
    'displayarticle',
    'updateArticle'
    
];

Router.before(IR_BeforeHooks.isAdmin, { only: routerNameAdmin });