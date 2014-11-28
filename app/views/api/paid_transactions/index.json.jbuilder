#need to do an array thingy!

json.array! @all_paid_trans.each do |trans|
	json.extract! trans, :id, :amount, :note, :created_at, :updated_at

	friend = current_user.friends.find(trans.receiver_id)

	json.payer current_user.username
	json.receiver friend.username
end