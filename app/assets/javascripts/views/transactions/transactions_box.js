BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],

	events: {
		'submit form': 'submitTransaction',
		'mousedown #trans-to': 'targetFocus',
		'keydown': 'renderResults'
	},

	initialize: function() {
		// friends.fetch();
		this.listenTo(friends, 'sync', this.render)
		this.keysPressed = [];
	},

	submitTransaction: function(event) {
		event.preventDefault();
		var attrs = $(event.target).serializeJSON();
		this.createTransaction(attrs);
		this.updateBalance(attrs.amount);
	},

	createTransaction: function(attrs) {
		attrs.payer_id = user.id;
		attrs.payer = user.attributes['username'];
		attrs.receiver_id = friends.findWhere({ username: attrs.receiver }).id
		this.collection.create(attrs, { wait: true } );
	},

	updateBalance: function(amount) {
		var curBalance = user.get('balance');
		user.save('balance', curBalance - amount, { patch: true });
	},

	render: function() {
		var content = this.template({ trans: this.model });
		this.$el.append(content);
		return this;
	},

	// instant search
	autoComplete: function() {
		var names = friends.pluck('username');
		var toBox = this.$el.find('#to')
		toBox.autocomplete({ source: names });
	},

	targetFocus: function(event) {
		// toBox.addClass('hover');
		$(event.target).focus();
	},

	renderResults: function(event) {
		var names = friends.pluck('username');
		$(event.target).autocomplete({ source: names });
		
		var letter = this._mapKeys(event.keyCode);
		var searchedFriend = this.keysPressed.join('');
		console.log(searchedFriend)
	},

	_mapKeys: function(keyCode) {
		if (keyCode === 8) 
			this.keysPressed.pop();		//if delete pressed
		else {
			var letter = String.fromCharCode(keyCode).toLowerCase();
			this.keysPressed.push(letter);
		}
	},

});

		// var filter = friends.where({ username: attrs.receiver });
		// attrs.receiver_id = new Backbone.Collection( filter ).at(0).id;

