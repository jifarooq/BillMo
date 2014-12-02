BillMo.Views.SplitCalc = Backbone.View.extend({
	template: JST["splitCalc/calcForm"],
	billTemplate: JST["splitCalc/bill"],
	personTemplate: JST["splitCalc/person"],

	events: {
		'click .add-bill': 'addBill',
		'click .del-bill': 'deleteBill',
		'click .add-person': 'addPerson',
		'click .del-person': 'setupDelete',
	},

	addBill: function(event) {
		var content = this.billTemplate();
		var $ul = $(event.target).parent().find('.amounts');
		$ul.append(content);
	},

	addPerson: function() {
		var content = this.personTemplate();
		this.$('#calc-holder').append(content);
	},

	deleteBill: function(event) {
		var $li = $(event.target).closest('li')
		var $ul = $(event.target).closest('ul')
		var liCount = $ul.find('li').length

		if (liCount > 1) 
			$li.remove();
		else 
			$li.find('input').val('')
	},

	deletePerson: function(event) {
		$(event.target).closest('li').remove();
	},

	

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.addPerson();
		return this;
	},
});
