BillMo.Views.SplitCalc = Backbone.View.extend({
	template: JST["splitCalc/calcForm"],
	billTemplate: JST["splitCalc/bill"],
	personTemplate: JST["splitCalc/person"],
	modalTemplate: JST["splitCalc/modal"],

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
		// randomize amount here
		var content = this.billTemplate({ amount: amount });
		var $ul = $(event.target).parent().find('.amounts');
		$ul.append(content);
		// this.updateSubtotal();
	},

	addPerson: function(name, amt) {
		// randomize name here
		var content = this.personTemplate({ name: name, amt: amt });
		this.$('#calc-holder').append(content);
	},

	calculateSplit: function() {
		var names = this.getNames(event);
		var subtotals = this.getSubtotals(event);
		var debts = this.getDebts(subtotals);
		var results = [];

		_(debts).each(function(debt, i) { 
			if (debt > 0) {
				// if any sum to 0, use sumToZero
				// results.push(names[i] + ' owes ' + names[j] + ' ' + debt);
				// set both debts to 0
				_(debts).each(function(innerDebt, j) {
					if (i === j) return;
					if (innerDebt < 0) {
						if (debt < Math.abs(innerDebt)) {
							results.push(names[i] + ' owes ' + names[j] + ' ' + debt);
							debts[j] = innerDebt + debt;
							debt = 0;
						} else {
							results.push(names[i] + ' owes ' + names[j] + ' ' + -innerDebt);
							debt = debt + innerDebt;
							debts[j] = 0;
					 	}
					}
				}); // close innerDebts loop
			}
		}); // close outer debts loop

		return results;
	},

	getDebts: function(subtotals) {
		var debts = [];
		var split = this._average(subtotals);

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
		// this.updateSubtotal();

		if (liCount > 1) 
			$li.remove();
		else 
			$li.find('input').val('')
	},

	deletePerson: function(event) {
		$(event.currentTarget).remove();
		this.$('.person').removeClass('hoverable');
	},

	render: function() {
		var content = this.template({ results: [] });
		this.$el.html(content);

		var rand1 = Math.ceil( Math.random() * 100 );
		var rand2 = Math.ceil( Math.random() * 100 );
		var rand3 = Math.ceil( Math.random() * 100 );

		this.addPerson('sam', rand1);
		this.addPerson('sarah', rand2);
		this.addPerson('john', rand3);
		return this;
	},

	renderResults: function() {
		results = this.calculateSplit;
		var content = this.modalTemplate({ results: results });
		this.$el.append(content);
	},

	setupDelete: function() {
		this.$('.person').addClass('hoverable');
	},

	sumBills: function(list) {
		var sum = 0, that = this;

		list.find('li').each(function(k, li) {
			var billInput = $(li).find('input').val();
			var amount = that._parseBill(billInput);
			// debugger
			sum = sum + amount;
		});

		return sum;
	},

	// need to adjust so that it can be called in add/del bills
	updateSubtotal: function(event) {
		var $ul = $(event.target).parent().parent();
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
