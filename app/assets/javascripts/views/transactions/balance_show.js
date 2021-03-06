// switched to just using a template rather than subview
// to prevent 'NaN' from flashing when loading the page

BillMo.Views.BalanceShow = Backbone.View.extend({
	tagName: 'span',
	template: JST["transactions/balance"],

	initialize: function() {
		this.listenTo(BillMo.currentUser, 'sync', this.render);
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
});