BillMo.Collections.Transactions = Backbone.Collection.extend({
	url: 'api/transactions',
  model: BillMo.Models.Transaction,
  comparator: function(trans) {
  	// hacky to use id instead of created_at, but works for now
  	return -trans.id;
  },
});

BillMo.transactions = new BillMo.Collections.Transactions();