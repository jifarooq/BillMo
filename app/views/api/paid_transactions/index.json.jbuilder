# :payer_id, :receiver_id,


@all_paid_trans.each do |trans|
	json.extract! trans, :amount, :note, :created_at, :updated_at

	friend = current_user.friends.find(trans.receiver_id)

	json.payer_name current_user.username
	json.receiver_name friend.username
end