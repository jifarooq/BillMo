BillMo.Views.SplitCalc = Backbone.View.extend({
	template: JST["splitCalc/calcForm"],
	billTemplate: JST["splitCalc/bill"],
	personTemplate: JST["splitCalc/person"],
	resultsTemplate: JST["splitCalc/results"],

	events: {
		'click button.add-bill': 'addBill',
		'click button.del-bill': 'deleteBill',
		'click button.add-person': 'addPerson',
		'click button.del-person': 'setupDelete',
		'mousedown .hoverable': 'deletePerson',
		'blur input.bill': 'updateSubtotal',
		'click button#calc-all': 'renderResults',
	},

	addBill: function(event) {
		var content = this.billTemplate({ amount: this.randAmount() });
		var $ul = $(event.target).parent().find('.amounts');
		$ul.append(content);
		this.updateSubtotal(event);
	},

	addPerson: function(name, amt) {
		// randomize name here
		var content = this.personTemplate({ name: name, amt: amt });
		this.$('#calc-holder').append(content);
	},

	calculateSplit: function() {
		var names = this.getNames(event);
		var subtotals = this.getSubtotals(event);
		var split = this._average(subtotals);
		var debts = this.getDebts(subtotals, split);
		var results = [];

		_(debts).each(function(debt, i) { 
			// if (debt === split) return;
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

	getDebts: function(subtotals, split) {
		var debts = [];

		_(subtotals).each(function(subtotal) { 
			debts.push(split - subtotal);
		});

		return debts;
	},

	getNames: function(event) {
		var names = [];
		var $names = $(event.currentTarget).find('input.name');

		$names.each(function(k, name) {
			names.push( $(name).val() );
		});

		return names;
	},

	getSubtotals: function(event) {
		var subtotals = [], that = this;
		var $subDivs = $(event.currentTarget).find('.subtotal');

		$subDivs.each(function(k, subDiv) {
			subtotals.push(that._parseSubtotal( $(subDiv).text() ));
		});

		return subtotals;
	},

	deleteBill: function(event) {
		var $li = $(event.target).closest('li')
		var $ul = $(event.target).closest('ul')
		var liCount = $ul.find('li').length
		this.updateSubtotal(event);

		if (liCount > 1) 
			$li.remove();
		else 
			$li.find('input').val('')
	},

	deletePerson: function(event) {
		$(event.currentTarget).remove();
		this.$('.person').removeClass('hoverable');
	},

	randAmount: function() {
		return Math.ceil( Math.random() * 100 );
	},

	render: function() {
		var content = this.template({ results: [] });
		this.$el.html(content);

		this.addPerson('sam', this.randAmount());
		this.addPerson('sarah', this.randAmount());
		this.addPerson('john', this.randAmount());
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

	updateSubtotal: function(event) {
		var $ul, text = $(event.target).text();
		var $parent = $(event.target).parent();

		if (text === 'add a bill')
			$ul = $parent.find('ul');
		else 
			$ul = $parent.parent();

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
