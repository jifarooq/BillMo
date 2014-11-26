BillMo.Views.TransactionsIndex = Backbone.View.extend({
  template: JST['transactions/index'],

  initialize: function() {
  	this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    // console.log(this.collection.length)
    // debugger
    if (this.collection.length > 0) {
    	var content = this.template({ transactions: this.collection });
    }
  	this.$el.append(content);
  	return this;
  },

});
