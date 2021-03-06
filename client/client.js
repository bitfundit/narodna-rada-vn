App = {
    subs : {
	posts : Meteor.subscribe ('Posts')
    }    
};

Meteor.startup (function () {
    Deps.autorun(function(){
	if (Meteor.userId())
	    Router.go('/dashboard');
    }); 
});

Template.layout.currentYear = function () {
    return new Date().getFullYear();
};

//Below is the helper to make active the needed menu items
Template.header.helpers({
    activeRouteClass: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
        var active = _.any(args, function(name) {
	    if ((location.pathname==='/') && (name==='home')) {
		return true;
	    }
	    else if (name!='home') {
		return ~location.pathname.indexOf(Router.path(name));
	    };
        });
        return active && 'active';
    }
});
