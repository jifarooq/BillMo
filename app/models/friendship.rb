# == Schema Information
#
# Table name: friendships
#
#  id        :integer          not null, primary key
#  user_id   :integer          not null
#  friend_id :integer          not null
#

class Friendship < ActiveRecord::Base
	validates :user, :friend, presence: true
	
	belongs_to :user
	belongs_to :friend, class_name: 'User'
end
