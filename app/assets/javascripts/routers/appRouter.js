BillMo.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
	},
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl
		this.transactions = Billmo.paid_transactions
	},

	index: function() {
		this.transactions.fetch();
		var view = new BillMo.Views.TransactionsIndex({ collection: this.transactions });
		this._swapView(view);
	},

	_swapView: function(view) {
		this._curView && this._curView.remove();
		this._curView = view;
		this.$rootEl.html(view.render().$el);
	}
});
