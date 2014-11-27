BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],

	events: {
		'submit form': 'createTransaction'
	},

	initialize: function() {
		// this.listenTo(this.collection, 'sync', this.render)
	},

	createTransaction: function(event) {
		event.preventDefault();
		var that = this;
		var attrs = $(event.target).serializeJSON();

		// this.model.set(attrs);

		this.collection.create(attrs, { wait: true } );

		// this.model.save({}, {
		// 	success: function() {
		// 		that.collection.add(that.model);
		// 		Backbone.history.navigate('', { trigger: true });
		// 	}
		// });
	},

	render: function() {
		var content = this.template({ trans: this.model })
		this.$el.append(content);
		return this;
	},
});