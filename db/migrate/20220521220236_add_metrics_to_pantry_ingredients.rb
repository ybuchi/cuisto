class AddMetricsToPantryIngredients < ActiveRecord::Migration[6.1]
  def change
    add_column :pantry_ingredients, :metric, :string
  end
end
