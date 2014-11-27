class AddIndexToTransactions < ActiveRecord::Migration
  def change
  	add_index :transactions, [:payer_id, :receiver_id], unique: true
  end
end
