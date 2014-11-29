BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],

	events: {
		'submit form': 'submitTransaction',
		'keydown #to': 'renderResults',
		'click button': 'setBoxState',
	},

	initialize: function() {
		this.payOn = true;
		this.listenTo(friends, 'sync', this.render)
	},

	submitTransaction: function(event) {
		event.preventDefault();
		var attrs = $(event.target).serializeJSON();
		this.createTransaction(attrs);
		this.updateBalance(attrs.amount);
	},

	createTransaction: function(attrs) {
		if (this.payOn) {
			attrs.payer_id = user.id;
			attrs.payer = user.attributes['username'];
			attrs.receiver_id = friends.findWhere({ username: attrs.receiver }).id;
		} else {
			attrs.receiver_id = user.id;
			attrs.receiver = user.attributes['username'];
			attrs.payer_id = friends.findWhere({ username: attrs.payer }).id;
		}

		this.collection.create(attrs, { wait: true });
	},

	// right now, re-rendering whole form, when only needs to render button!
	setBoxState: function(event) {
		event.preventDefault();
		if (event.target.id === 'pay') this.payOn = true;
		else this.payOn = false;
		this.render().$el;
	},

	updateBalance: function(amount) {
		var curBalance = user.get('balance');
		user.save('balance', curBalance - amount);
	},

	render: function() {
		var content = this.template({ 
			trans: this.model,
			transState: this.payOn 
		});
		this.$el.html(content);
		return this;
	},

	// instant search
	renderResults: function(event) {
		var names = friends.pluck('username');
		$(event.target).autocomplete({ 
			source: names,
			position: { offset: '-20 -300' }
		});
	},

});

// 'mousedown #to': 'targetFocus',
// targetFocus: function(event) {
// 	// toBox.addClass('hover');
// 	$(event.target).focus();
// },

// var filter = friends.where({ username: attrs.receiver });
// attrs.receiver_id = new Backbone.Collection( filter ).at(0).id;

