class Rename < ActiveRecord::Migration
  def change
  	rename_column :users, :filepicker_url, :image_url
  end
end
