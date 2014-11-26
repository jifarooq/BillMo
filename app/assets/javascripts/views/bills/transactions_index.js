BillMo.Views.TransactionsIndex = Backbone.View.extend({
  template: JST['bills/index'],

  initialize: function() {
  	this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
  	var content = this.template({ transactions: this.collection });
  	this.$el.html(content);
  	return this;
  },

  //destroy
});
