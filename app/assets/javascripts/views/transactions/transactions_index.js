BillMo.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST['transactions/index'],

  initialize: function(options) {
    this.listenTo(user, 'sync', this.render);
  	this.listenTo(this.collection, 'add', this.addFeedItem);

    //works for now but not efficient
    this.listenTo(this.collection, 'remove', this.render);

    //ensure new feed items stay on refresh!
    this.listenTo(this.collection, 'sync', this.render);
  },

  addFeedItem: function(trans) {
    var itemView = new BillMo.Views.TransactionsIndexItem({ model: trans });
    this.addSubview('.news-feed', itemView);
  },

  addTransactionBox: function() {
    var newTrans = new BillMo.Models.Transaction();
    var transBox = new BillMo.Views.TransactionsBox({
      model: newTrans,
      collection: this.collection
    });
    this.addSubview('.outer-pay-box', transBox);
  },

  removeFeedItem: function(trans) {
    var selector = '.news-feed';
    var subview = _.find(this.subviews(selector), function(subview) {
      if(subview.model.id === trans.id){ return true; }
    });
    // debugger
    // ASK TA about this
    this.removeSubview(selector, subview);
    // subview.remove();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.addTransactionBox();
    this.renderFeedItems();
    return this;
  },

  renderFeedItems: function() {
    this.collection.each(this.addFeedItem.bind(this));
  },

});
