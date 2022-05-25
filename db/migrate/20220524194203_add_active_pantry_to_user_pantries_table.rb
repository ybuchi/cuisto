class AddActivePantryToUserPantriesTable < ActiveRecord::Migration[6.1]
  def change
    add_column :user_pantries, :active, :boolean
  end
end
