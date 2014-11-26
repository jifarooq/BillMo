BillMo.Collections.Transactions = Backbone.Collection.extend({
	url: 'api/paid_transactions',
  model: BillMo.Models.Transaction,

});