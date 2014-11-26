class ChangeTransactions < ActiveRecord::Migration
  def change
  	rename_column :transactions, :user_id, :payer_id
  	add_column :transactions, :receiver_id, :integer, null: false
  end
end