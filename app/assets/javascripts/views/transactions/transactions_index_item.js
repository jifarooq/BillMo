BillMo.Views.TransactionsIndexItem = Backbone.CompositeView.extend({
  template: JST["transactions/index_item"],
  events: {'click .delete-trans': 'destroyTrans'},

  initialize: function () {
    this.collection = this.model.comments();
    this.collection.fetch();

    this.addCommentForm();
    this.addComments();

    // this.listenTo(this.model, 'sync', this.addComments);
  },

  addCommentForm: function() {
    var commentForm = new BillMo.Views.CommentForm({ 
      collection: this.collection
    });
    this.addSubview('.comment', commentForm);
  },

  addComments: function(trans) {
    var commentsView = new BillMo.Views.CommentsIndex({ 
      collection: this.collection
    });
    this.addSubview('.comment', commentsView);
  },

  destroyTrans: function(){
    this.model.destroy();
  },
  
  render: function(){
    var content = this.template({ trans: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
