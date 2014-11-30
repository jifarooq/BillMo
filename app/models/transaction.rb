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

class Transaction < ActiveRecord::Base
	validates :amount, :note, :payer, :receiver, presence: true
	validates :amount, numericality: true
	
	#custom validation doesn't seem to work!
	validate :payer_receiver_differ

	belongs_to :payer, class_name: 'User', foreign_key: :payer_id
	belongs_to :receiver, class_name: 'User', foreign_key: :receiver_id

	def payer_receiver_differ
		payer_id != receiver_id
	end

end
