BillMo.Models.User = Backbone.Model.extend({
	// for user singular resource, just need url, not urlRoot
	url: 'api/user',

	getBalance: function() {
		var curBalance = this.get('balance');
		return '$' + parseFloat(curBalance).toFixed(2);
	}
});

BillMo.user = new BillMo.Models.User();
BillMo.user.fetch();