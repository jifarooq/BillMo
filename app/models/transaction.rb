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
	has_many :comments

	def rand_device
		rand_num = rand(100)
		return 'iphone' if rand_num.between?(0, 34)
		return 'android' if rand_num.between?(35, 59)
		return 'web' if rand_num.between?(60, 79)
		return 'carrier pigeon' if rand_num.between?(80, 99)
	end

	private 
		def payer_receiver_differ
			payer_id != receiver_id
		end
		
end
