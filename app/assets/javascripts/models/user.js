BillMo.Models.User = Backbone.Model.extend({
	urlRoot: 'api/users',
});

user = new BillMo.Models.User();
user.fetch();