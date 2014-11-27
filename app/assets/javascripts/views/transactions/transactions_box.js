BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],

	// initialize: function() {

	// },
	
	render: function() {
		var content = this.template({ trans: this.model })
		this.$el.append(content);
		return this;
	},
});