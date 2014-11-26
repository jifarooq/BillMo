json.extract! @paid_trans, :amount, :note, :created_at, :updated_at

# :payer_id, :receiver_id,

json.payer current_user.username
json.receiver current_user.friends.find(receiver_id)