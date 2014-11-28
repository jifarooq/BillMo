BillMo.Collections.Transactions = Backbone.Collection.extend({
  comparator: 'updated_at',
	url: 'api/paid_transactions',
  model: BillMo.Models.Transaction,

});

// only need paid_transactions
paid_transactions = new BillMo.Collections.Transactions();