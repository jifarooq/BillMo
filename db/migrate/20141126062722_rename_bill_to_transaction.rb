class RenameBillToTransaction < ActiveRecord::Migration
  def change
  	rename_table :bills, :transactions
  end
end
