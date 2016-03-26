var IR_BeforeHooks = {
    isAdmin: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin'])) {
            this.render('login');
            pause();
        } else {
            this.next();
        }
    },
    isAdminOrMember: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin', 'member'])) {
            this.render('login');
            pause();
        } else {
            this.next();
        }
    },
    checkoutNotLogin: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin', 'member'])) {
            this.render('login');
            pause();
        } else {
            this.next();
        }
    }
};

var routerNameAdmin = [
    'article',
    'displayart',
    'categories',
    'discategories',
    'manageuser'
];
/*var routerNameMember = [
    'profile',
    'editprofile',
    'reward',
    'member',
    'dailyPopup',
    'confirmorder',
    'confirmorder1',
    'confirmorder2',
    'payment'

];*/
//var routerCheckout = ['checkout'];
Router.before(IR_BeforeHooks.isAdmin, { only: routerNameAdmin });
//Router.before(IR_BeforeHooks.isAdminOrMember, { only: routerNameMember }); //for member
//Router.onAfterAction(IR_BeforeHooks.trackingRouter);
//Router.onAfterAction(IR_BeforeHooks.sitemap);


//Router.onBeforeAction(IR_BeforeHooks.MySubscription);
//Router.onBeforeAction(IR_BeforeHooks.checkoutNotLogin,{except:['login','register']});
if (Meteor.isClient) {
  Router.onBeforeAction(IR_BeforeHooks.checkoutNotLogin,{except:['login','register']});
}
