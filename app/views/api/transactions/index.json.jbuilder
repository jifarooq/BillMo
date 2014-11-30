json.array! @all_trans.each do |trans|
	payer = User.find(trans.payer_id)
	receiver = User.find(trans.receiver_id)

	json.extract! trans, :id, :amount, :note#, :created_at, :updated_at
	json.payer payer.username
	json.receiver receiver.username
	json.payer_url user_url(payer)
	json.receiver_url user_url(receiver)

	json.post_date time_ago_in_words(trans.created_at) + ' ago'
	json.device trans.rand_device
end