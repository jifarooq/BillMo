BillMo.Views.TransactionsIndexItem = Backbone.CompositeView.extend({
  template: JST["transactions/index_item"],
  events: {'click .delete-trans': 'destroyTrans'},

  initialize: function () {
    this.addCommentForm();
  },

  addCommentForm: function() {
    var commentForm = new BillMo.Views.CommentForm();
    this.addSubview('.comment', commentForm);
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
