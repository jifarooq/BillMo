BillMo.Collections.Transactions = Backbone.Collection.extend({
	url: 'api/paid_transactions',
  model: BillMo.Models.Transaction,
  comparator: function(trans) {
  	// hacky to use id instead of created_at, but works for now
  	return -trans.id;
  },

});

// only need paid_transactions
paid_transactions = new BillMo.Collections.Transactions();