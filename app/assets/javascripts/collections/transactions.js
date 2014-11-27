BillMo.Collections.Transactions = Backbone.Collection.extend({
	url: 'api/paid_transactions',
  model: BillMo.Models.Transaction,

});

// only need paid_transactions
paid_transactions = new BillMo.Collections.Transactions();