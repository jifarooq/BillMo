# == Schema Information
#
# Table name: bills
#
#  id         :integer          not null, primary key
#  amount     :float            not null
#  note       :string(255)
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Bill < ActiveRecord::Base
	validates :amount, :note, presence: true

	belongs_to :user
end
