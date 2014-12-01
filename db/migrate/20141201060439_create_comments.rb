class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
    	t.string :content, null: false
    	t.integer :transaction_id, null: false

      t.timestamps
    end

    add_index :comments, :transaction_id
  end
end
