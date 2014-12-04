class ChangeIndexToFriendships < ActiveRecord::Migration
  def change
  	remove_index :friendships, [:user_id, :friend_id]
  	add_index :friendships, [:user_id, :friend_id]
  end
end
