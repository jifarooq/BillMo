BillMo.Views.CommentsIndex = Backbone.View.extend({
	template: JST["comments/index"],
	events: {'click .delete-comment': 'destroyComment'},

	initialize: function() {
		// fine for now since won't be many comments
		this.listenTo(this.collection, 'sync remove', this.render);
	},

	destroyComment: function(event){
		var id = $(event.target).data('id');
		var comment = this.collection.get(id);
		comment.destroy();
	},

	render: function() {
		var content = this.template({ comments: this.collection });
		this.$el.html(content);
		return this;
	},
});