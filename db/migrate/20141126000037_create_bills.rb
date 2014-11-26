class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
    	t.float :amount, null: false
    	t.string :note
    	t.integer :user_id
    	# friend id? or join/relationship table for users

      t.timestamps
    end
  end
end
