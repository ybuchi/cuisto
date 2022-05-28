class AddRestockToUserIngredient < ActiveRecord::Migration[6.1]
  def change
    add_column :pantry_ingredients, :needs_restock, :boolean, default: false
  end
end
