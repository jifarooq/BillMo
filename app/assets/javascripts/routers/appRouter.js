BillMo.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
	},
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},

	index: function() {
		this.bills.fetch();
		var view = new BillMo.Views.BillsIndex({ collection: this.bills });
		this._swapView(view);
	},

	_swapView: function(view) {
		this._curView && this._curView.remove();
		this._curView = view;
		this.$rootEl.html(view.render().$el);
	}
});
