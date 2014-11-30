BillMo.Models.Transaction = Backbone.Model.extend({
	urlRoot: 'api/transactions',
	formatAmount: function() {
		return '$' + parseFloat(this.get('amount')).toFixed(2);
	},
});
