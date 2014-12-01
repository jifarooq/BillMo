BillMo.Collections.Comments = Backbone.Collection.extend({
	model: BillMo.Models.Comment,
	url: function() {
		return this.transaction.url() + "/comments"
	},

	initialize: function(models, options){
		this.transaction = options.transaction;
	},
});
