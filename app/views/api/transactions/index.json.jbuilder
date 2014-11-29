json.array! @all_trans.each do |trans|
	json.extract! trans, :id, :amount, :note, :created_at, :updated_at

	payer = User.find(trans.payer_id)
	receiver = User.find(trans.receiver_id)

	json.payer payer.username
	json.receiver receiver.username
end