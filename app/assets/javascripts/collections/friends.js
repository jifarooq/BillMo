BillMo.Collections.Friends = Backbone.Collection.extend({
	url: 'api/friends',
  model: BillMo.Models.Friend,

});

BillMo.friends = new BillMo.Collections.Friends();