# == Schema Information
#
# Table name: comments
#
#  id             :integer          not null, primary key
#  content        :string(255)      not null
#  transaction_id :integer          not null
#  created_at     :datetime
#  updated_at     :datetime
#

class Comment < ActiveRecord::Base
	validates :content, :transaction, presence: true

	belongs_to :transaction
end
