BillMo.Views.CommentForm = Backbone.View.extend({
  template: JST["comments/form"],
  template2: JST['submit'],
  events: {
    'keydown #add-comment': 'renderSubmitButton',
    'mouseleave form': 'clearSubmitButton',
    'submit form': 'createComment'
    //form should come back on mouseenter
  },

  clearSubmitButton: function() {
    this.$('.comment-submit').empty();
  },

  createComment: function(event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    attrs.transaction_id = this.collection.transaction.id;
    this.collection.create(attrs);
  },
  
  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  renderSubmitButton: function() {
    var content = this.template2({ submitVal: 'Post' });
    this.$('.comment-submit').html(content);
    return this;
  },

});

// 'mousedown #to': 'targetFocus',
// targetFocus: function(event) {
//  // toBox.addClass('hover');
//  $(event.target).focus();
// },

// var filter = friends.where({ username: attrs.receiver });
// attrs.receiver_id = new Backbone.Collection( filter ).at(0).id;