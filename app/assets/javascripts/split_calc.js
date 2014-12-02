BillMo.Views.SplitCalc = Backbone.View.extend({
	template: JST["splitCalc/calcForm"],
	billTemplate: JST["splitCalc/bill"],
	personTemplate: JST["splitCalc/person"],

	events: {
		'click .add-bill': 'addBill',
		'click .del-bill': 'deleteBill',
		'click .add-person': 'addPerson',
		'click .del-person': 'setupDelete',
		'mousedown .hoverable': 'deletePerson',

		// 'mouseout .amount': 'updateSubtotal'
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

	updateSubtotal: function() {
		var $ul = $(event.target).parent().find('ul')
		// debugger
	},

	// left off here
	subtotal: function(list) {
		var subtotal = 0;

		list.find('li').each(function(k, li) {
			var $li = $(li);
			var subtotal = subtotal + $li.find('input').val();
		})
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
		$(event.currentTarget).remove();
		this.$('.person').removeClass('hoverable');
	},

	setupDelete: function() {
		this.$('.person').addClass('hoverable');
	},

	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.addPerson();
		return this;
	},

});
