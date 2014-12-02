BillMo.Collections.Friendships = Backbone.Collection.extend({
	url: 'api/friendships',
  model: BillMo.Models.Friendship,

});

BillMo.friendships = new BillMo.Collections.Friendships();
BillMo.friendships.fetch();