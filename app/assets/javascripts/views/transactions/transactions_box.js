BillMo.Views.TransactionsBox = Backbone.View.extend({
	template: JST['transactions/box'],
	template2: JST['submit'],

	events: {
		'submit form': 'submitTransaction',
		'keydown #to': 'renderResults',
		'click button': 'setBoxState',
	},

	initialize: function() {
		this.payOn = this.payOn || true;
		this.listenTo(BillMo.friends, 'sync', this.render)
	},

	createTransaction: function(attrs) {
		var user = BillMo.currentUser;
		
		if (this.payOn) {
			attrs.payer_id = user.id;
			attrs.payer = user.attributes['username'];
			attrs.receiver_id = BillMo.friends.findWhere({ username: attrs.receiver }).id;
		} else {
			attrs.receiver_id = user.id;
			//by default, form 'to' is receiver, so need to flip here
			attrs.payer = attrs.receiver; 
			attrs.receiver = user.attributes['username'];
			attrs.payer_id = BillMo.friends.findWhere({ username: attrs.payer }).id;
		}

		this.collection.create(attrs, {
			wait: true,
			error: function() { alert('Amount must be a number'); }
		});
	},

	render: function() {
		var content = this.template({ 
			trans: this.model,
			transState: this.payOn 
		});
		this.$el.html(content);
		this.renderSubmitButton();
		return this;
	},

	// instant search
	renderResults: function(event) {
		var names = BillMo.friends.pluck('username');
		$(event.target).autocomplete({ 
			source: names,
			appendTo: '#ac-container'
		});
	},

	renderSubmitButton: function() {
		var submitVal = (this.payOn ? 'Pay' : 'Charge');
		var content = this.template2({ submitVal: submitVal });
		this.$('#submit-trans').html(content);
		return this;
	},

	setBoxState: function(event) {
		event.preventDefault();
		$(event.target).addClass('pushed-button')

		if (event.target.id === 'pay') {
			this.payOn = true;
			this.$('#charge').removeClass('pushed-button')
		} else {
			this.payOn = false;
			this.$('#pay').removeClass('pushed-button')
		}

		this.renderSubmitButton().$el;
	},

	submitTransaction: function(event) {
		event.preventDefault();
		var attrs = $(event.target).serializeJSON();
		this.createTransaction(attrs);
		this.updateUserBalance(attrs.amount);
		this.updateFriendBalance(attrs);
	},

	updateFriendBalance: function(attrs) {
		if (attrs.amount * 0 !== 0) return;
		var amount = parseFloat(attrs.amount);

		if (this.payOn) {
			var friend = BillMo.friends.get(attrs.receiver_id);
			var curBalance = friend.get('balance');
			friend.save('balance', curBalance + amount);
		} else {
			var friend = BillMo.friends.get(attrs.payer_id);
			var curBalance = friend.get('balance');
			friend.save('balance', curBalance - amount);
		}
	},

	updateUserBalance: function(amount) {
		var user = BillMo.currentUser;
		if (amount * 0 === 0) {
			var curBalance = user.get('balance');
			amount = (this.payOn ? amount : -amount);
			user.save('balance', curBalance - amount);
		}
	},

});

