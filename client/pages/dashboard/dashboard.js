Template.dashboard.helpers({
    gotohome : function (){
        return Router.go('/');
    }
});

Template.dashboardMenu.helpers({
    gotohome : function (){
        return Router.go('/');
    }
});

Template.dashboardMenu.checkRole = function (role) {
    if (Meteor.user().role) return role === Meteor.user().role
};

Template.usersEdit.checkRole = function (role) {
    if (Meteor.user().role) return role === Meteor.user().role
};

Template.postsEdit.checkRole = function (role) {
    if (Meteor.user().role) return role === Meteor.user().role
};

Template.usersList.allUsers = function () {
    return Meteor.users.find({_id:{$exists:true}},{fields:{_id:1,emails:1,'services.facebook.email':1, role:1, permissions:1}}).fetch();
}; 

Template.usersList.equals = function (a,b) {
    if (a === b) return "checked";
    return '';
};

Template.usersList.events({
    'click .save': function (event, template){
	checkedUsers = [];
	$('input[name=users]:checked').each(function() {
	    checkedUsers.push($(this).val());
	});
	newRole = template.find('input[name=roleRadios]:checked').value;
	Meteor.call('updateUsersRoles',checkedUsers,newRole,function(error,result){
	    if (!error) return true;
	});
    }
});
