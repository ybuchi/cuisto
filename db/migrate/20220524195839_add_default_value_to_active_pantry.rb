class AddDefaultValueToActivePantry < ActiveRecord::Migration[6.1]
  def change
    change_column :user_pantries, :active, :boolean, default: true
  end
end
