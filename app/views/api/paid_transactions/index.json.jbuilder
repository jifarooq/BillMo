#need to do an array thingy!

json.array! @all_paid_trans.each do |trans|
	json.extract! trans, :id, :amount, :note, :created_at, :updated_at

	payingUser = User.find(trans.payer_id)
	receivingUser = User.find(trans.receiver_id)

	json.payer payingUser.username
	json.receiver receivingUser.username
end