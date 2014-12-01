BillMo.Views.TransactionsIndexItem = Backbone.View.extend({
  template: JST["transactions/index_item"],
  events: {'click #delete': 'destroyTrans'},

  destroyTrans: function(){
    this.model.destroy();
  },
  
  render: function(){
    var content = this.template({ trans: this.model });
    this.$el.html(content);
    return this;
  }
});
