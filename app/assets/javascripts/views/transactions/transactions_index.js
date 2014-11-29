BillMo.Views.TransactionsIndex = Backbone.View.extend({
  template: JST['transactions/index'],

  events: {
    'click #delete': 'destroyTrans'
  },

  initialize: function(options) {
    this.listenTo(user, 'sync', this.render)
  	this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.collection, 'remove', this.render)
  },

  render: function() {
    if (this.collection.length !== 'undefined') {
    	var content = this.template({ transactions: this.collection });
    }
    this.$el.html(content);
    this.addTransactionBox();
  	return this;
  },

  addTransactionBox: function() {
    var newTrans = new BillMo.Models.Transaction();
    var transBox = new BillMo.Views.TransactionsBox({
      model: newTrans,
      collection: this.collection
    });
    this.attachTransBox('.outer-pay-box', transBox.render());
  },

  attachTransBox: function(selector, view) {
    this.$(selector).append(view.$el);
    view.delegateEvents();
  },

  destroyTrans: function(event) {
    var id = $(event.target).data('id');
    var trans = this.collection.get(id);
    trans.destroy();
  },

});
