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
		'click button#calc-all': 'renderResults',
		'mousedown .hoverable': 'deletePerson',
		'blur input.bill': 'updateSubtotal',
	},

	addBill: function(event) {
		var content = this.billTemplate({ amount: this.randAmount() });
		var $ul = $(event.target).parent().find('.amounts');
		$ul.append(content);
		this.updateSubtotal(event, $ul);
	},

	addPerson: function(event, name) {
		amt = this.randAmount();
		name = name || 'person' + amt;
		var content = this.personTemplate({ name: name, amt: amt });
		$(content).insertAfter(this.$('#calc-holder .first-person'));
	},

	calculateSplit: function() {
		var names = this._getNames(event);
		var subtotals = this._getSubtotals(event);
		var split = this._average(subtotals);
		var debts = this._getDebts(subtotals, split);
		var results = [];

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
		var $li = $(event.target).closest('li');
		var $ul = $(event.target).closest('ul');
		var liCount = $ul.find('li').length;

		if (liCount > 1) { 
			$li.remove();
		} else {
			$li.find('input').val('');
		}

		this.updateSubtotal(event, $ul);
	},

	deletePerson: function(event) {
		// add message for how to delete
		$(event.currentTarget).remove();
		this.$('.person').removeClass('hoverable');
	},

	randAmount: function() {
		return Math.ceil( Math.random() * 100 );
	},

	render: function() {
		var amts = [ this.randAmount(), this.randAmount() ];
		var content = this.template({ amts: amts });
		this.$el.html(content);

		// pass a null event
		this.addPerson(null, 'sarah');
		this.addPerson(null, 'john');
		return this;
	},

	renderResults: function() {
		var results = this.calculateSplit();
		var content = this.resultsTemplate({ results: results });
		this.$('#results-holder').html(content);
	},

	setupDelete: function() {
		this.$('.person').addClass('hoverable');
	},

	sumBills: function(list) {
		var sum = 0, that = this;

		list.find('li').each(function(k, li) {
			var billInput = $(li).find('input').val();
			var amount = that._parseBill(billInput);
			sum = sum + amount;
		});

		return sum;
	},

	updateSubtotal: function(event, $ul) {
		if (!$ul) $ul = $(event.target).parent().parent();

		var $person = $ul.parent();
		var subtotal = this.sumBills($ul);
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
		var names = [];
		var $names = $(event.currentTarget).find('input.name');

		$names.each(function(k, name) {
			names.push( $(name).val() );
		});

		return names;
	},

	_getSubtotals: function(event) {
		var subtotals = [], that = this;
		var $subDivs = $(event.currentTarget).find('.subtotal');

		$subDivs.each(function(k, subDiv) {
			subtotals.push(that._parseSubtotal( $(subDiv).text() ));
		});

		return subtotals;
	},

	_parseBill: function(billInput) {
		var pattern = /^[\d, \.]+/
		var strAmount = billInput.match(pattern).toString().trimRight(1);
		var amount = parseFloat(strAmount);
		return amount;
	},

	_parseSubtotal: function(input) {
		var pattern = /[\d, \.]+$/
		var strAmount = input.match(pattern).toString();
		var amount = parseFloat(strAmount);
		return amount;
	},

});
