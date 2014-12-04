BillMo.Views.CommentsIndex = Backbone.View.extend({
	template: JST["comments/index"],
	events: {'click .delete-comment': 'destroyComment'},

	initialize: function() {
		this.listenTo(this.collection, 'add remove', this.render);
	},

	destroyComment: function(event){
		var id = $(event.target).data('id');
		var comment = this.collection.get(id);
		comment.destroy();
	},

	render: function() {
		// rendering twice when it's the first comment! why?
		if (curComment !== this.collection.last()) {
			curComment = this.collection.last();
			var content = this.template({ comments: this.collection });
			this.$el.html(content);
		}

		return this;
	},
});