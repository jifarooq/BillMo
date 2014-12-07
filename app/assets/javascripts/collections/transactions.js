BillMo.Collections.Transactions = Backbone.Collection.extend({
	url: 'api/transactions',
  model: BillMo.Models.Transaction,
  comparator: function(trans) {
  	return -trans.id;
  },
});

BillMo.transactions = new BillMo.Collections.Transactions();