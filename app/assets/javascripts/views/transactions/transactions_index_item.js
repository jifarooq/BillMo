BillMo.Views.TransactionsIndexItem = Backbone.CompositeView.extend({
  template: JST["transactions/index_item"],
  events: {'click #delete': 'destroyTrans'},

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
    this.addCommentForm();
    return this;
  }
});
