BillMo.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST['transactions/index'],

  initialize: function() {
    // this.listenTo(BillMo.currentUser, 'sync', this.displayBalance);
  	this.listenTo(this.collection, 'add', this.addFeedItem);
    this.listenTo(this.collection, 'remove', this.removeFeedItem);

    // these used to be called in render.
    this.addBalance();
    this.addTransactionBox();
    this.renderFeedItems();

    //ensure new feed items stay on refresh
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

  //named display to signify it's not a subview, just a template
  // displayBalance: function() {
  //   var content = this.template2();
  //   this.$('.money').html(content);
  // },

  addBalance: function() {
    var balanceView = new BillMo.Views.BalanceShow();
    this.addSubview('.money', balanceView);
  },

  removeFeedItem: function(trans) {
    var selector = '.news-feed';

    var subview = _.find(this.subviews(selector), function(subview) {
      if(subview.model.id === trans.id){ return true; }
    });

    this.removeSubview(selector, subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();  // remove won't work properly w/o this
    return this;
  },

  renderFeedItems: function() {
    this.collection.each(this.addFeedItem.bind(this));
  },

});
