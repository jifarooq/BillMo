BillMo.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',

	getBalance: function() {
		var curBalance = this.get('balance');
		return '$' + parseFloat(curBalance).toFixed(2);
	}
});

user = new BillMo.Models.User();
user.fetch();