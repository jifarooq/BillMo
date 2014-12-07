BillMo.Models.CurrentUser = Backbone.Model.extend({
	// using url--not urlRoot--since it's a singular resource
	url: 'api/user',

	getBalance: function() {
		var curBalance = this.get('balance');
		return '$' + parseFloat(curBalance).toFixed(2);
	},

	isFriend: function(user) {
		return !!BillMo.friends.get(user.id);
	}
});

BillMo.currentUser = new BillMo.Models.CurrentUser();