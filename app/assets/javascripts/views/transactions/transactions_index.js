BillMo.Views.TransactionsIndex = Backbone.View.extend({
  template: JST['transactions/index'],

  initialize: function() {
  	this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    if (this.collection.length > 0) {
    	var content = this.template({ transactions: this.collection });
    }
    debugger
    this.$el.append(content);
    this.addTransactionBox();
  	return this;
  },

  addTransactionBox: function() {
    var transBox = new BillMo.Views.TransactionsBox({
      model: this.model,
      el: '.pay_box'
    });
    this.attachTransBox('.pay-box', transBox.render());
  },

  attachTransBox: function(selector, view) {
    this.$(selector).append(view.$el);
    view.delegateEvents();
  },
});
