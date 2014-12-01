BillMo.Models.Transaction = Backbone.Model.extend({
	urlRoot: 'api/transactions',
	formatAmount: function() {
		return '$' + parseFloat(this.get('amount')).toFixed(2);
	},

	comments: function() {
		if (!this._comments) {
			this._comments = new BillMo.Collections.Comments([], { transaction: this });
		}
		return this._comments;
	},
});