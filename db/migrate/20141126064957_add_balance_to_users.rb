class AddBalanceToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :balance, :float, default: 1000
  end
end

# later could set a random default balance