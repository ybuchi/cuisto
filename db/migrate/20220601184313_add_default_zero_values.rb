class AddDefaultZeroValues < ActiveRecord::Migration[6.1]
  def change
    change_column :user_libraries, :times_cooked, :integer, default: 0
    change_column :users, :recipes_cooked, :integer, default: 0
  end
end
