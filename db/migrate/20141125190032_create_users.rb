class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :token, null: false
      t.string :gravatar_url

      t.timestamps
    end
  end
end
