BillMo.Models.CurrentUser = Backbone.Model.extend({
	// for user singular resource, just need url, not urlRoot
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
BillMo.currentUser.fetch();