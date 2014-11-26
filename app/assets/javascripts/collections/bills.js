BillMo.Collections.Bills = Backbone.Collection.extend({
	urlRoot: 'api/transactions',
  model: BillMo.Models.Transaction,

});
