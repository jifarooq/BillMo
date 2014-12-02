BillMo.Collections.Users = Backbone.Collection.extend({
	url: 'api/users',
  model: BillMo.Models.User,
});

BillMo.users = new BillMo.Collections.Users();