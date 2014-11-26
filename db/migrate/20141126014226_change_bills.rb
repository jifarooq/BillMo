class ChangeBills < ActiveRecord::Migration
  def change
  	change_column :bills, :user_id, :integer, null: false
  end
end
