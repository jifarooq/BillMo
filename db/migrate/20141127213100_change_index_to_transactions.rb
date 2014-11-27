class ChangeIndexToTransactions < ActiveRecord::Migration
  def change
  	remove_index :transactions, [:payer_id, :receiver_id]
  	add_index :transactions, [:payer_id, :receiver_id]
  end
end
