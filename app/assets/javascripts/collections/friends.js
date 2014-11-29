BillMo.Collections.Friends = Backbone.Collection.extend({
	url: 'api/friends',
  model: BillMo.Models.Friend,

});

friends = new BillMo.Collections.Friends();
friends.fetch();