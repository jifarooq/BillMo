class RenameUsersColumn < ActiveRecord::Migration
  def change
  	rename_column :users, :gravatar_url, :filepicker_url
  end
end
