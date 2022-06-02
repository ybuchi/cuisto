class AddProfilePicture < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :profile_picture, :string, default: ""
  end
end
