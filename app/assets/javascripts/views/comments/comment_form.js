BillMo.Views.CommentForm = Backbone.View.extend({
  template: JST["comments/form"],
  template2: JST['submit'],
  // on input, clear val and render submit button
  events: {
    'keydown #add-comment': 'renderSubmitButton',
    'mouseleave #add-comment': 'clearSubmitButton'
  },

  createComment: function(attrs) {
    event.preventDefault();
    debugger
    this.collection.create(attrs, { wait: true });
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

  clearSubmitButton: function() {
    this.$('.comment-submit').empty();
  },
});

// 'mousedown #to': 'targetFocus',
// targetFocus: function(event) {
//  // toBox.addClass('hover');
//  $(event.target).focus();
// },

// var filter = friends.where({ username: attrs.receiver });
// attrs.receiver_id = new Backbone.Collection( filter ).at(0).id;