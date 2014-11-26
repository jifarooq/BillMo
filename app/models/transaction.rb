# == Schema Information
#
# Table name: transactions
#
#  id          :integer          not null, primary key
#  amount      :float            not null
#  note        :string(255)
#  payer_id    :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  receiver_id :integer          not null
#

#later make sure to add indices for payer_id and receiver_id!

class Transaction < ActiveRecord::Base
	validates :amount, :note, presence: true
	validates :payer, :receiver, presence: true

	belongs_to :payer, class_name: 'User', foreign_key: :payer_id
	belongs_to :receiver, class_name: 'User', foreign_key: :receiver_id
end
