BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],

	events: {
		'submit form': 'createTransaction',
		'mousedown #trans-to': 'targetFocus',
		'keydown': 'renderResults'
	},

	initialize: function() {
		// this.listenTo(this.collection, 'sync', this.render)
		friends.fetch();
		this.keysPressed = [];
	},

	createTransaction: function(event) {
		event.preventDefault();
		var that = this;
		var attrs = $(event.target).serializeJSON();

		this.collection.create(attrs, { wait: true } );

		// this.collection.create(attrs, { 
		// 	success: function() {
		// 		Backbone.history.navigate('', { trigger: true });
		// 	}
		// });
	},

	render: function() {
		// debugger
		var content = this.template({ trans: this.model })
		this.$el.append(content);
		return this;
	},

	targetFocus: function(event) {
		// toBox.addClass('hover');
		$(event.target).focus();
	},

	renderResults: function(event) {
		// debugger
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

