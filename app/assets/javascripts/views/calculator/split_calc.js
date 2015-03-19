BillMo.Views.SplitCalc = Backbone.View.extend({
	
	template: JST["splitCalc/calcForm"],
	billTemplate: JST["splitCalc/bill"],
	personTemplate: JST["splitCalc/person"],
	resultsTemplate: JST["splitCalc/results"],

	events: {
		'click .del-bill': 'deleteBill',
		'click button.add-bill': 'addBill',
		'click button.add-person': 'addPerson',
		'click button.del-person': 'setupDelete',
		'click button.fixed-amounts': 'setFixedAmounts',
		'click button#calc-all': 'renderResults',
		'mousedown .hoverable': 'deletePerson',
		'blur input.bill': 'updateSubtotal',
	},

	addBill: function(event) {
		var content = this.billTemplate({ amount: this.randAmount() }),
				$ul = $(event.target).parent().find('.amounts');
		$ul.append(content);
		this.updateSubtotal(event, $ul);
	},

	addPerson: function(event) {
		var amt = this.randAmount(), name = this.randName(),
				content = this.personTemplate({ name: name, amt: amt });
		$(content).insertAfter(this.$('#calc-holder .first-person'));
	},

	calculateSplit: function() {
		var names = this._getNames(event),
				subtotals = this._getSubtotals(event),
				split = this._average(subtotals),
				debts = this._getDebts(subtotals, split),
				results = [];

		_(debts).each(function(debt, i) { 
			if (debt > 0) {

				_(debts).each(function(innerDebt, j) {
					if (i === j || debt === 0) return;

					// find first negative debt, this person owed money
					if (innerDebt < 0) {
						if (debt < Math.abs(innerDebt)) {
							results.push(names[i] + ' owes ' + names[j] + ' $' + debt.toFixed(2));
							debts[j] = innerDebt + debt;
							debt = 0;
						} else {
							results.push(names[i] + ' owes ' + names[j] + ' $' + (-innerDebt).toFixed(2));
							debt = debt + innerDebt;
							debts[j] = 0;
					 	}
					}
				}); // close innerDebts loop
			}
		}); // close outer debts loop

		return results;
	},

	deleteBill: function(event) {
		var $li = $(event.target).closest('li'),
				$ul = $(event.target).closest('ul'),
				liCount = $ul.find('li').length;

		if (liCount > 1) { 
			$li.remove();
		} else {
			$li.find('input').val('');
		}

		this.updateSubtotal(event, $ul);
	},

	deletePerson: function(event) {
		// to do: add message for how to delete
		$(event.currentTarget).remove();
		this.$('.person').removeClass('hoverable');
	},

	randAmount: function() {
		return Math.ceil( Math.random() * 100 );
	},

	randName: function() {
		return BillMo.names[ Math.floor(Math.random() * BillMo.names.length) ];
	},

	render: function() {
		var amts = [ this.randAmount(), this.randAmount() ],
				names = [ this.randName(), this.randName() ],
				content = this.template({ amts: amts, names: names });
		this.$el.html(content);

		this.addPerson(), this.addPerson();
		return this;
	},

	// animate printing results
	renderResults: function() {
		var results = this.calculateSplit(),
				content = this.resultsTemplate({ results: results }),
				len = results.length, 
				timeout = 400;

		this.$('#results-holder').html(content);
		this.$('.split-results').removeClass('hidden');		
		this.$('.split-results #result-0').removeClass('hidden');

		for (var i = 1; i < len; i++) {
			setTimeout(_showResult.bind(i), timeout * i);
		}

		function _showResult() {
			var $selector = $('.split-results #result-' + this);
			$selector.removeClass('hidden');	
		}
	},

	setFixedAmounts: function() {
		var $gparent = $(event.target).parent().parent(),
				$ul = $gparent.find('ul'),
				$billEntries = $gparent.find('.bill'),
				amount = 10;

		$billEntries.each(function(k, entry) {
			$(entry).val(amount + ' for dog food');
			amount = amount + 10;
		});

		$('input.bill').trigger('blur');
	},

	setupDelete: function() {
		this.$('.person').addClass('hoverable');
	},

	sumBills: function(list) {
		var sum = 0, that = this;

		list.find('li').each(function(k, li) {
			var billInput = $(li).find('input').val(),
			 		amount = that._parseBill(billInput);
			sum = sum + amount;
		});

		return sum;
	},

	updateSubtotal: function(event, $ul) {
		if (!$ul) $ul = $(event.target).parent().parent();

		var $person = $ul.parent(),
				subtotal = this.sumBills($ul);
		$person.find('.subtotal').text('Total: $' + subtotal.toFixed(2));
	},

	_average: function(arr) {
		var sum = 0;

		_(arr).each(function(num){
			sum = sum + num;
		});

		return sum / arr.length;
	},

	_getDebts: function(subtotals, split) {
		var debts = [];

		_(subtotals).each(function(subtotal) { 
			debts.push(split - subtotal);
		});

		return debts;
	},

	_getNames: function(event) {
		var names = [],
				$names = $(event.currentTarget).find('input.name');

		$names.each(function(k, name) {
			names.push( $(name).val() );
		});

		return names;
	},

	_getSubtotals: function(event) {
		var subtotals = [], that = this,
				$subDivs = $(event.currentTarget).find('.subtotal');

		$subDivs.each(function(k, subDiv) {
			subtotals.push(that._parseSubtotal( $(subDiv).text() ));
		});

		return subtotals;
	},

	_parseBill: function(billInput) {
		if (!billInput) return 0;

		var pattern = /^[\d, \.]+/,
				strAmount = billInput.match(pattern).toString().trimRight(1),
				amount = parseFloat(strAmount);
		return amount;
	},

	_parseSubtotal: function(input) {
		var pattern = /[\d, \.]+$/,
				strAmount = input.match(pattern).toString(),
				amount = parseFloat(strAmount);
		return amount;
	},

});
