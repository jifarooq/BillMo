BillMo.Views.CommentsIndex = Backbone.View.extend({
	template: JST["comments/index"],
	events: {'click #delete-comment': 'destroyComment'},

	destroyComment: function(){
		// find by data id, then destroy
		this.model.destroy();
	},

	render: function() {
		var content = this.template({ trans: this.model });
		this.$el.html(content);
		return this;
	},
});