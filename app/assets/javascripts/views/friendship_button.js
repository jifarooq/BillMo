BillMo.Views.Friendship = Backbone.View.extend({
	template: JST["friendship"],

	events: {
		'click .remove-friend': 'destroyFriendship',
		'click .add-friend': 'createFriendship'
	},

	initialize: function() {
		// listenTo won't work here?
		this.listenTo(BillMo.friendships, 'sync remove', this.render);
	},

	createFriendship: function() {
		var attrs = {};
		attrs.friend_id = $(event.target).data('id');
		attrs.user_id = BillMo.currentUser.id;
		BillMo.friendships.create(attrs, { success: this.render.bind(this) });
	},

	destroyFriendship: function() {
		var id = $(event.target).data('id');
		var friendship = BillMo.friendships.findWhere({ friend_id: id });
		friendship.destroy({ success: this.render.bind(this) });
	},

	render: function() {
		var users = BillMo.users.remove(BillMo.currentUser.id);
		var content = this.template({ users: BillMo.users });
		this.$el.html(content);
		return this;
	},

});
