BillMo.Views.TransactionsIndex = Backbone.View.extend({
  template: JST['transactions/index'],

  initialize: function(options) {
  	this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    if (this.collection.length > 0) {
    	var content = this.template({ transactions: this.collection });
    }
    this.$el.append(content);
    this.addTransactionBox();
    debugger
  	return this;
  },

  addTransactionBox: function() {
    var newTrans = new BillMo.Models.Transaction();
    var transBox = new BillMo.Views.TransactionsBox({
      model: newTrans,
      collection: this.collection
      // el: '.pay_box' don't do this
    });
    this.attachTransBox('.pay-box', transBox.render());
  },

  attachTransBox: function(selector, view) {
    this.$(selector).append(view.$el);
    view.delegateEvents();
  },
});
